/**
 * @file Specifications for command line options to provide type safe cli usage
 * @author Max Gallup <maxgallup@pm.me>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "clispec",

  extras: ($) => [/\s/],

  word: ($) => $.identifier,

  rules: {
    source_file: ($) => seq(repeat($._declaration)),

    doc_comment: ($) => token(seq("///", /.*/)),
    line_comment: ($) => token(seq("//", /.*/)),

    identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,

    keyword_type: ($) => "type",
    keyword_opt: ($) => "opt",
    keyword_arg: ($) => "arg",
    keyword_cmd: ($) => "cmd",
    keyword_requires: ($) => "requires",
    keyword_excludes: ($) => "excludes",
    keyword_effects: ($) => "effects",
    keyword_subcommands: ($) => "subcommands",

    operator_and: ($) => "&",
    operator_or: ($) => "|",

    open_paren: ($) => "(",
    closed_paren: ($) => ")",
    open_bracket: ($) => "{",
    closed_bracket: ($) => "}",
    open_square: ($) => "[",
    closed_square: ($) => "]",
    open_chevron: ($) => "<",
    closed_chevron: ($) => ">",

    comma: ($) => ",",
    range: ($) => "..",

    _declaration: ($) =>
      seq(
        choice(
          $.type_declaration,
          $.opt_declaration,
          $.arg_declaration,
          $.cmd_declaration,
          $.doc_comment,
          $.line_comment,
        ),
      ),

    declaration_block: ($) =>
      seq($.open_bracket, repeat($._declaration), $.closed_bracket),

    _constraint_declaration: ($) =>
      seq(
        choice(
          $.requires_clause,
          $.excludes_clause,
          $.effects_clause,
          $.subcommands_clause,
        ),
      ),

    constraint_block: ($) =>
      seq($.open_square, repeat($._constraint_declaration), $.closed_square),

    named_identifier: ($) => token(/[a-zA-Z][a-zA-Z0-9_]*/),

    int_literal: ($) => token(/-?\d+/),
    float_literal: ($) => token(/-?\d+\.\d+/),
    string_literal: ($) => token(/\"(?:[^\"\\]|\\.)*\"/),
    bool_literal: ($) => token(choice("true", "false")),
    fat_arrow: ($) => "=>",

    _type_expression: ($) =>
      choice($.named_identifier, $.anonymous_enum_expression, $.nested_type),

    nested_type: ($) =>
      seq(
        field("outer", $.named_identifier),
        $.open_chevron,
        field("inner", $._type_expression),
        $.closed_chevron,
      ),

    literals: ($) =>
      choice($.int_literal, $.float_literal, $.string_literal, $.bool_literal),

    anonymous_enum_expression: ($) =>
      seq($.literals, repeat(seq($.operator_or, $.literals))),

    type_declaration: ($) =>
      seq(
        $.keyword_type,
        $.named_identifier,
        $.fat_arrow,
        $._type_expression,
        optional($.constraint_block),
      ),

    requires_clause: ($) => seq($.keyword_requires, $._boolean_expression),
    excludes_clause: ($) => seq($.keyword_excludes, $._boolean_expression),
    effects_clause: ($) => seq($.keyword_effects, $._boolean_expression),
    subcommands_clause: ($) =>
      seq($.keyword_subcommands, $._boolean_expression),

    and_expression: ($) =>
      prec.left(
        2,
        seq($._boolean_expression, $.operator_and, $._boolean_expression),
      ),

    or_expression: ($) =>
      prec.left(
        1,
        seq($._boolean_expression, $.operator_or, $._boolean_expression),
      ),

    paren_expression: ($) =>
      seq($.open_paren, $._boolean_expression, $.closed_paren),

    _boolean_expression: ($) =>
      choice(
        $.paren_expression,
        $.named_identifier,
        $.and_expression,
        $.or_expression,
      ),

    opt_declaration: ($) =>
      seq(
        $.keyword_opt,
        $.opt_unit,
        $.fat_arrow,
        $._type_expression,
        optional($.constraint_block),
      ),

    opt_unit: ($) =>
      seq(
        $.named_identifier,
        $.open_paren,
        seq($.string_literal, repeat(seq($.comma, $.string_literal))),
        $.closed_paren,
      ),

    arg_declaration: ($) =>
      seq(
        $.keyword_arg,
        $.arg_unit,
        $.fat_arrow,
        $._type_expression,
        optional($.constraint_block),
      ),

    arg_unit: ($) =>
      seq(
        $.named_identifier,
        $.open_paren,
        seq(
          optional(field("start", $.int_literal)),
          $.range,
          optional(field("end", $.int_literal)),
        ),
        $.closed_paren,
      ),

    cmd_declaration: ($) =>
      seq(
        $.keyword_cmd,
        $.cmd_unit,
        optional($.constraint_block),
        optional($.declaration_block),
      ),

    cmd_unit: ($) =>
      seq(
        $.named_identifier,
        $.open_paren,
        seq($.string_literal, repeat(seq($.comma, $.string_literal))),
        $.closed_paren,
      ),
  },
});
