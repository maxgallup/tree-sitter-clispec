import XCTest
import SwiftTreeSitter
import TreeSitterClispec

final class TreeSitterClispecTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_clispec())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading CliSpec grammar")
    }
}
