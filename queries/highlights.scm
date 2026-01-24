; Comments
(doc_comment) @comment.documentation
(line_comment) @comment

; Keywords
(keyword_type) @keyword
(keyword_opt) @keyword
(keyword_arg) @keyword
(keyword_cmd) @keyword
(keyword_requires) @keyword
(keyword_excludes) @keyword
(keyword_effects) @keyword
(keyword_subcommands) @keyword

; Operators
(operator_and) @operator
(operator_or) @operator
(fat_arrow) @operator
(range) @operator

; Punctuation - Brackets
(open_paren) @punctuation.bracket
(closed_paren) @punctuation.bracket
(open_bracket) @punctuation.bracket
(closed_bracket) @punctuation.bracket
(open_square) @punctuation.bracket
(closed_square) @punctuation.bracket
(open_chevron) @punctuation.bracket
(closed_chevron) @punctuation.bracket

; Punctuation - Delimiters
(comma) @punctuation.delimiter

; Literals
(int_literal) @number
(float_literal) @number.float
(string_literal) @string
(bool_literal) @constant.builtin

; Type declarations
(type_declaration
  (named_identifier) @type.definition)

(nested_type
  (named_identifier) @type)


(type_expression
  (named_identifier) @type)

; Option declarations
(opt_declaration
  (opt_unit
    (named_identifier) @variable.parameter))

; Argument declarations
(arg_declaration
  (arg_unit
    (named_identifier) @variable.parameter))

; Command declarations
(cmd_declaration
  (cmd_unit
    (named_identifier) @function))


; Anonymous enum values in type expressions
(anonymous_enum_expression
  (literals) @constant)
