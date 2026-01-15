_default:
    watchexec --restart \
        --watch grammar.js \
        --clear \
        -- just grammar

grammar:
    tree-sitter generate
    tree-sitter build --wasm
    tree-sitter playground

build:
    @tree-sitter generate
    @tree-sitter build
