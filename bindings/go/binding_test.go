package tree_sitter_clispec_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_clispec "github.com/tree-sitter/tree-sitter-clispec/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_clispec.Language())
	if language == nil {
		t.Errorf("Error loading CliSpec grammar")
	}
}
