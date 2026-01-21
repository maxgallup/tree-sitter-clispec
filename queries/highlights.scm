; highlights.scm for clispec grammar

; ============================================================================
; Comments
; ============================================================================

(DocComment
  (DocComment_content) @comment.documentation)

(LineComment
  (LineComment_content) @comment)

; ============================================================================
; Literals
; ============================================================================

(StringLiteral
  (StringLiteral_value) @string)

(IntLiteral
  (IntLiteral_value) @number)

(FloatLiteral
  (FloatLiteral_value) @number.float)

; ============================================================================
; Keywords
; ============================================================================

(TypeDeclaration__keyword) @keyword
(OptDeclaration__keyword) @keyword
(ArgDeclaration__keyword) @keyword
(CmdDeclaration__keyword) @keyword

(RequiresClause__keyword) @keyword
(ExcludesClause__keyword) @keyword
(EffectsClause__keyword) @keyword
(SubCommandsClause__keyword) @keyword

; ============================================================================
; Types
; ============================================================================

; Type names in type expressions
(TypeExpression_Named
  (NamedIdentifier
    (NamedIdentifier_name) @type))

; Outer type in nested types (e.g., List in List<String>)
(NestedType
  outer: (NamedIdentifier
    (NamedIdentifier_name) @type))



; Type declaration name
(TypeDeclaration
  name: (NamedIdentifier
    (NamedIdentifier_name) @type.definition))

; ============================================================================
; Declarations - Names/Identifiers
; ============================================================================

; Option name
(OptUnit
  name: (NamedIdentifier
    (NamedIdentifier_name) @variable.parameter))

; Argument name
(ArgUnit
  name: (NamedIdentifier
    (NamedIdentifier_name) @variable.parameter))

; Command name
(CmdUnit
  name: (NamedIdentifier
    (NamedIdentifier_name) @function))

; Boolean expression identifiers (references to options/args)
(BoolIdentExpression_Identifier
  (NamedIdentifier
    (NamedIdentifier_name) @variable))

; ============================================================================
; Operators
; ============================================================================

(TypeDeclaration__fat_arrow) @operator
(OptDeclaration__fat_arrow) @operator
(ArgDeclaration__fat_arrow) @operator

(BoolIdentExpression_And_1) @operator
(BoolIdentExpression_Or_1) @operator

(ArgUnit__range) @operator

; Enum separators
(AnonymousEnumExpression_Integer_0_vec_delimiter) @operator
(AnonymousEnumExpression_Float_0_vec_delimiter) @operator
(AnonymousEnumExpression_String_0_vec_delimiter) @operator

; ============================================================================
; Punctuation - Brackets
; ============================================================================

(NestedType__open_chevron) @punctuation.bracket
(NestedType__close_chevron) @punctuation.bracket

(ParenBooleanExpression__open_paren) @punctuation.bracket
(ParenBooleanExpression__close_paren) @punctuation.bracket

(OptUnit__open_paren) @punctuation.bracket
(OptUnit__close_paren) @punctuation.bracket

(ArgUnit__open_paren) @punctuation.bracket
(ArgUnit__close_paren) @punctuation.bracket

(CmdUnit__open_paren) @punctuation.bracket
(CmdUnit__close_paren) @punctuation.bracket

(ConstraintBlock__open_bracket) @punctuation.bracket
(ConstraintBlock__close_bracket) @punctuation.bracket

(DeclarationBlock__open_bracket) @punctuation.bracket
(DeclarationBlock__close_bracket) @punctuation.bracket

; ============================================================================
; Punctuation - Delimiters
; ============================================================================

(OptUnit_names_vec_delimiter) @punctuation.delimiter
(CmdUnit_commands_vec_delimiter) @punctuation.delimiter
