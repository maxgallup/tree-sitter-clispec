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
    source_file: ($) => repeat($._declaration),
    _declaration: ($) => choice($.type_declaration),

    doc_comment: ($) => token(seq("///", /.*/)),
    line_comment: ($) => token(seq("//", /.*/)),
    source_file: ($) => repeat($._declaration),

    named_identifier: ($) => token(/[A-Z][a-zA-Z0-9_]*/),

    int_literal: ($) => token(/\d+/),
    float_literal: ($) => token(/\d+\.\d+/),
    string_literal: ($) => token(/\"[a-zA-Z0-9_]*\"/),
    bool_literal: ($) => token(choice("true", "false")),

    type_declaration: ($) =>
      seq(
        "type",
        field("type_id", $.named_identifier),
        "=",
        field(
          "type_value",
          choice($.type_alias, $.anonymous_enum_expression, $.nested_type),
        ),
      ),

    nested_type: ($) =>
      seq(
        field("type_id", $.named_identifier),
        "<",
        field("value", choice($.nested_type, $.named_identifier)),
        ">",
      ),

    type_alias: ($) => field("type_id", $.named_identifier),

    anonymous_enum_expression: ($) =>
      choice($.integer_enum, $.float_enum, $.string_enum),

    integer_enum: ($) => seq($.int_literal, repeat(seq("|", $.int_literal))),

    float_enum: ($) => seq($.float_literal, repeat(seq("|", $.float_literal))),

    string_enum: ($) =>
      seq($.string_literal, repeat(seq("|", $.string_literal))),
  },
});
