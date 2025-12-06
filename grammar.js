/**
 * @file Tree-sitter grammar definition for CliSpec
 * @author Max Gallup <maxgallup@pm.me>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "clispec",

  extras: ($) => [/\s/, $.line_comment],

  rules: {
    source_file: ($) => repeat($._declaration),

    _declaration: ($) =>
      choice(
        $.flag_declaration,
        $.type_declaration,
        $.option_declaration,
        $.alias_declaration,
      ),

    // /// comment lines
    line_comment: ($) => token(seq("///", /.*/)),

    // flag DisplayAll<"a", "all">
    // flag Author<None, "author"> requires LongFormat
    flag_declaration: ($) =>
      seq(
        "flag",
        field("name", $.identifier),
        field("parameters", $.parameter_list),
        optional(field("requires", $.requires_clause)),
      ),

    // type PowerOfTwoSize { "K" | "M" | ... }
    type_declaration: ($) =>
      seq(
        "type",
        field("name", $.identifier),
        "{",
        field("body", $.union_type),
        "}",
      ),

    // option BlockSize<None, "block-size"> = SizeKind
    // option Color<None, "color"> = WhenArgument?
    option_declaration: ($) =>
      seq(
        "option",
        field("name", $.identifier),
        field("parameters", $.parameter_list),
        "=",
        field("type", $.type_expression),
        optional(field("requires", $.requires_clause)),
      ),

    // alias DashF<"f", None> = DisplayAll & DoNotSort
    alias_declaration: ($) =>
      seq(
        "alias",
        field("name", $.identifier),
        field("parameters", $.parameter_list),
        "=",
        field("value", $.expression),
      ),

    // <"a", "all"> or <None, "author"> or <"f", None>
    parameter_list: ($) =>
      seq(
        "<",
        field("short", $._parameter_value),
        ",",
        field("long", $._parameter_value),
        ">",
      ),

    _parameter_value: ($) => choice($.string_literal, $.none),

    // requires LongFormat
    requires_clause: ($) => seq("requires", $.identifier),

    // Union type: "K" | "M" | "G" | ...
    union_type: ($) =>
      seq(
        $.string_literal,
        repeat(seq("|", $.string_literal)),
        optional("|"), // trailing pipe allowed
      ),

    // Type expression with optional `?`
    type_expression: ($) => seq($._type_base, optional("?")),

    _type_base: ($) => choice($.identifier, $.union_type_inline),

    // Inline union type in expression context
    union_type_inline: ($) =>
      seq($.identifier, repeat1(seq("|", $.identifier))),

    // Expression with & operator: DisplayAll & DoNotSort
    expression: ($) => choice($.identifier, $.binary_expression),

    binary_expression: ($) =>
      prec.left(
        1,
        seq(
          field("left", $.expression),
          field("operator", "&"),
          field("right", $.expression),
        ),
      ),

    // Identifiers
    identifier: ($) => /[A-Z][a-zA-Z0-9_]*/,

    // String literals: "string"
    string_literal: ($) =>
      token(seq('"', repeat(choice(/[^"\\]/, seq("\\", /./))), '"')),

    // None keyword
    none: ($) => "None",
  },
});
