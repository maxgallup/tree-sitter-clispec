/**
 * @file Specifications for command line options to provide type safe cli usage
 * @author Max Gallup <maxgallup@pm.me>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "clispec",

  rules: {
    source_file: ($) => repeat($.declaration),

    doc_comment: ($) => token(seq("///", /.*/)),
    line_comment: ($) => token(seq("//", /.*/)),

    declaration: ($) =>
      choice(
        $.type_declaration,
        $.opt_declaration,
        $.arg_declaration,
        $.cmd_declaration,
        $.metadata_declaration,
        $.doc_comment,
        $.line_comment,
      ),

    metadata_declaration: ($) =>
      seq(
        "meta",
        "{",
        "\n",
        seq("name:", field("name", $.string_literal), "\n"),
        seq("description:", field("description", $.string_literal), "\n"),
        seq("version:", field("version", $.string_literal), "\n"),
        repeat($.declaration),
        "}",
        "\n",
      ),

    named_identifier: ($) => token(/[A-Z][a-zA-Z0-9_]*/),

    int_literal: ($) => token(/-?\d+/),
    float_literal: ($) => token(/-?\d+\.\d+/),
    string_literal: ($) => token(/\"(?:[^\"\\]|\\.)*\"/),
    bool_literal: ($) => token(choice("true", "false")),

    type_expression: ($) =>
      field(
        "expression",
        choice($.named_reference, $.anonymous_enum_expression, $.nested_type),
      ),
    nested_type: ($) => seq($.named_reference, "<", $.type_expression, ">"),

    named_reference: ($) => field("id", $.named_identifier),

    anonymous_enum_expression: ($) =>
      choice($.integer_enum, $.float_enum, $.string_enum),

    integer_enum: ($) => seq($.int_literal, repeat(seq("|", $.int_literal))),

    float_enum: ($) => seq($.float_literal, repeat(seq("|", $.float_literal))),

    string_enum: ($) =>
      seq($.string_literal, repeat(seq("|", $.string_literal))),

    type_declaration: ($) =>
      seq("type", $.named_reference, "=", $.type_expression, "\n"),

    requires_declaration: ($) => seq("requires:", $.type_expression),

    excludes_declaration: ($) => seq("excludes:", $.type_expression),

    opt_declaration: ($) =>
      seq(
        "opt",
        $.named_reference,
        "(",
        seq($.string_literal, repeat(seq(",", $.string_literal))),
        ")",
        "=",
        $.type_expression,
        "\n",
      ),

    arg_declaration: ($) =>
      seq(
        "arg",
        $.named_reference,
        "(",
        seq(
          optional(field("start", $.int_literal)),
          "..",
          optional(field("end", $.int_literal)),
        ),
        ")",
        "=",
        $.type_expression,
        "\n",
      ),

    cmd_declaration: ($) =>
      seq("cmd", $.string_literal, "{", "\n", repeat($.declaration), "}", "\n"),
  },
});
