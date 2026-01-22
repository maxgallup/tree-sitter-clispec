; Nodes that increase indent level
[
  (declaration_block)
  (constraint_block)
  (nested_type)
] @indent

; Closing delimiters that decrease indent
[
  (closed_bracket)
  (closed_square)
  (closed_chevron)
  (closed_paren)
] @outdent

; Branch nodes - closing brackets on their own line
[
  (closed_bracket)
  (closed_square)
] @branch
