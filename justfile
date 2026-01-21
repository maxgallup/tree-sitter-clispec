build:
    @tree-sitter build --wasm
    @tree-sitter playground

# Generates html files to display in markdown book as examples
examples:
    tree-sitter highlight --html --css-classes ../specifications/rm/rm.csp | sed 's/font-family: monospace/font-family: monospace; background: black/' | sed 's/005f5f/2dc4b7/' | sed 's/5f00d7/ceb40c/'  > ../docs/src/spec-rm.html
