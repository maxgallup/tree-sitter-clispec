; brackets.scm for clispec grammar

; ============================================================================
; Chevrons - Nested Types (e.g., List<String>)
; ============================================================================

(NestedType__open_chevron) @punctuation.bracket
(NestedType__close_chevron) @punctuation.bracket

; ============================================================================
; Parentheses
; ============================================================================

; Boolean expression grouping
(ParenBooleanExpression__open_paren) @punctuation.bracket
(ParenBooleanExpression__close_paren) @punctuation.bracket

; Option unit (opt name("-n", "--name"))
(OptUnit__open_paren) @punctuation.bracket
(OptUnit__close_paren) @punctuation.bracket

; Argument unit (arg name(0..1))
(ArgUnit__open_paren) @punctuation.bracket
(ArgUnit__close_paren) @punctuation.bracket

; Command unit (cmd name("run", "r"))
(CmdUnit__open_paren) @punctuation.bracket
(CmdUnit__close_paren) @punctuation.bracket

; ============================================================================
; Square Brackets - Constraint Blocks
; ============================================================================

(ConstraintBlock__open_bracket) @punctuation.bracket
(ConstraintBlock__close_bracket) @punctuation.bracket

; ============================================================================
; Curly Braces - Declaration Blocks
; ============================================================================

(DeclarationBlock__open_bracket) @punctuation.bracket
(DeclarationBlock__close_bracket) @punctuation.bracket
