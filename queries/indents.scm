; indents.scm for clispec grammar

; ============================================================================
; Declaration Blocks (command bodies)
; ============================================================================

(DeclarationBlock
  (DeclarationBlock__open_bracket) @indent.begin
  (DeclarationBlock__close_bracket) @indent.end @indent.branch)

; ============================================================================
; Constraint Blocks
; ============================================================================

(ConstraintBlock
  (ConstraintBlock__open_bracket) @indent.begin
  (ConstraintBlock__close_bracket) @indent.end @indent.branch)

; ============================================================================
; Nested Types (for multi-line generic types)
; ============================================================================

(NestedType
  (NestedType__open_chevron) @indent.begin
  (NestedType__close_chevron) @indent.end @indent.branch)

; ============================================================================
; Parenthesized Boolean Expressions
; ============================================================================

(ParenBooleanExpression
  (ParenBooleanExpression__open_paren) @indent.begin
  (ParenBooleanExpression__close_paren) @indent.end @indent.branch)
