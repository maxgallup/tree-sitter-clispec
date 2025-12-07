/**
 * @file Tree-sitter grammar definition for CliSpec
 * @author Max Gallup <maxgallup@pm.me>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "clispec",

  extras: ($) => [/\s/, $.line_comment, $.doc_comment],

  rules: {
    source_file: ($) => repeat($._declaration),

    _declaration: ($) =>
      choice(
        $.flag_declaration,
        $.type_declaration,
        $.option_declaration,
        $.alias_declaration,
      ),

    // /// documentation comment lines
    doc_comment: ($) => token(seq("///", /.*/)),

    // // Standard comments
    line_comment: ($) => token(seq("//", /.*/)),

    // flag DisplayAll<"a", "all">
    // flag Author<None, "author"> requires LongFormat
    flag_declaration: ($) =>
      seq(
        "flag",
        field("argument_id", $.identifier),
        field("parameters", $.parameter_list),
        optional(field("requires", $.requires_clause)),
      ),

    // type PowerOfTwoSize {
    //     name: String,
    //     Variant1,
    //     Variant2,
    //     version: "v1" | "v2",
    // }
    //
    type_declaration: ($) =>
      seq(
        "type",
        field("type_id", $.identifier),
        "{",

        repeat(
          choice(seq($.type_data_declaration, ","), $.type_data_declaration),
        ),

        "}",
      ),

    type_data_declaration: ($) =>
      choice(
        $.type_field_declaration,
        $.variant_field_declaration,
        $.literal_union_type,
      ),

    // type Example { hello: Type, }
    //                ^^^^^^^^^^^
    type_field_declaration: ($) =>
      seq(
        field("field_name", token(/[a-z][a-zA-Z0-9_]*/)),
        ":",
        field("field_expression", $.optional_type_name),
      ),

    // type Example { Variant1, }
    //                ^^^^^^^^
    variant_field_declaration: ($) => field("variant_id", $.identifier),

    // option BlockSize<None, "block-size"> = SizeKind
    // option Color<None, "color"> = WhenArgument?
    option_declaration: ($) =>
      seq(
        "option",
        field("argument_id", $.identifier),
        field("parameters", $.parameter_list),
        "=",
        field("type", $.optional_type_name),
        optional(field("requires", $.requires_clause)),
      ),

    // alias DashF<"f", None> = DisplayAll & DoNotSort
    alias_declaration: ($) =>
      seq(
        "alias",
        field("argument_id", $.identifier),
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

    _literal_expression: ($) =>
      choice($.string_literal, $.int_literal, $.float_literal),

    // 420
    int_literal: ($) => token(/\d+/),

    // 2.1
    float_literal: ($) => token(/\d+\.\d+/),

    // bool literal true or false
    bool_literal: ($) => token(choice("true", "false")),

    // requires LongFormat
    requires_clause: ($) => seq("requires", field("argument_id", $.identifier)),

    literal_union_type: ($) =>
      choice(
        $.string_literal_union_type,
        $.int_literal_union_type,
        $.float_literal_union_type,
      ),

    // "K" | "M" | "G" | ...
    string_literal_union_type: ($) =>
      seq($.string_literal, repeat(seq("|", $.string_literal))),

    // 1 | 2 | 3 | ...
    int_literal_union_type: ($) =>
      seq($.int_literal, repeat(seq("|", $.int_literal))),

    // 1.0 | 2.0 | 3.0 | ...
    float_literal_union_type: ($) =>
      seq($.float_literal, repeat(seq("|", $.float_literal))),

    // Type expression with optional `?`
    optional_type_name: ($) =>
      seq(
        choice(field("type_id", $.identifier), $.literal_union_type),
        optional(field("option_type", token("?"))),
      ),

    // Expression with & operator: DisplayAll & DoNotSort
    expression: ($) =>
      choice(field("argument_id", $.identifier), $.binary_expression),

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
    identifier: ($) => token(/[A-Z][a-zA-Z0-9_]*/),

    // String literals: "string"
    string_literal: ($) =>
      token(seq('"', repeat(choice(/[^"\\]/, seq("\\", /./))), '"')),

    // None keyword
    none: ($) => token("None"),
  },
});
