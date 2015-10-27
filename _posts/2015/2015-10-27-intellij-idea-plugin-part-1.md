---
title: Creating Garmin Connect IQ Plugin for IntelliJ IDEA - Part 1
comments: true
---

This is the first post in a series of blog posts describing the process of creating an IntelliJ IDEA plugin for [Garmin Connect IQ](http://developer.garmin.com/connect-iq/overview).

## IDEA Setup

Setting up IntelliJ IDEA for plugin development is quite well documented in the [IntelliJ Platform SDK DevGuide](http://www.jetbrains.org/intellij/sdk/docs/basics/getting_started/setting_up_environment.html). Only things that I would add is installing plugins [Grammar-Kit](https://github.com/JetBrains/Grammar-Kit) and [PsiViewer](https://github.com/cmf/psiviewer), which are both available in the official plugins repository.

**Grammar-Kit** enables us to write the language grammar in a variant of BNF ([Backus-Naur Form](https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_Form)) and then generate java classes for parsers, element types and PSI (Program Structure Interface).
It also allows us to generate [JFlex](http://jflex.de/)-compatible lexer definition file (*.flex) from the grammar. JFlex is a lexical analyzer generator (also known as scanner generator) for Java. JFlex lexer is based on deterministic finite automaton. After the .flex file generation you use the JFlex generator (also bundled with the Grammar-Kit plugin). The plugin also features live preview where we can type in our language and see the parsing result immediately.

<!--more-->

IntelliJ parses files in two steps:

1. AST ([abstract syntax tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree)) is built to describe structure of the program. This is already done by IntelliJ Platform itself and creates ASTNode class for each AST node, where each of these have element type (of IElementType instance). These types are defined by our plugin, where the top-level node has to implement IFileElementType). Each node is mapped to text range in the document. The bottom-most nodes match exactly the same tokens as defined in our lexer, whereas higher ones match multiple-token fragments. Nodes are reordered, removed, inserted or otherwise changed if the code in the document changes.
2. PSI is built on top of the AST, adding semantics and methods for manipulating specific language constructs. PSI tree node is implementing PsiElement interface and is created by our plugin in ParserDefinition.createElement() method. Top-level node for a file must implement PsiFile interface and is created in ParserDefinition.createFile() method. PSI tree nodes are called PSI elements and they contain info about each token, i.e variable name, method arguments, position in file, etc. They can be used to find references  (usages) from declaration or declaration from reference. PSI elements are very IntelliJ IDEA platform specific and they are used a lot.

**PsiViewer** will help us to write and debug our grammar (BNF) by showing PSI tree for a file (or aforementioned Grammar-Kit live preview). 


## Grammar
Basic structure for the .bnf file is:

1. Grammar-Kit configuration
2. Language keywords and other tokens (i.e braces, brackets, colons etc)
3. Grammar rules

Let’s have a look on simplified example for basic syntax for rules:

    arguments_rule ::= ‘(‘ argument_name ‘)’
    method_rule ::= method_name (arguments_rule | ‘()’)

where method_rule matches either someMethod(arg) or someMethod() depending what argument_name and method_name matches (let’s assume here that they are alphanumeric names).

Each rule can optionally have modifiers:

- `private`: PSI node will not be generated for this rule. Rules are public by default.
- `external`: not generated. Used for generated and handwritten code integration.
- `left`: left-associativity support. PSI node for this rule will enclose the one to the left.
- `inner`: left-injection. PSI node for this rule will be injected into the one to the left.
- `meta`: meta grammar support. Meta rules work in conjunction with external expressions.
- `fake`: no parser code will be generated. For PSI hierarchy generation only.

Modifiers can be combined, `inner` should only be used together with `left`, `private left` is equivalent to `private left inner`.



To be continued...
