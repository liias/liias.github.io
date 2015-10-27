---
title: Creating Garmin Connect IQ Plugin for IntelliJ IDEA - Part 1
comments: true
---

This is the first post in a series of blog posts describing the process of creating an IntelliJ IDEA plugin for [Garmin Connect IQ](http://developer.garmin.com/connect-iq/overview).

## The Language
I wanted to start from the language support. It's called [Monkey C](http://developer.garmin.com/connect-iq/monkey-c/) and has quite simple syntax and has similarities with C, Java, Ruby, Python and Lua.
There are no specifications of the language, but there is an [online](http://developer.garmin.com/connect-iq/developer-tools/functions/) (and [offline](http://developer.garmin.com/connect-iq/sdk/)) developer's manual available (and you could decompile their Eclipse SDK and antlr compiler to see what's inside).

### Grammar

There is a very useful plugin for IntelliJ called Grammar-Kit which allows you to write up the grammar in a variant of [BNF](https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_Form) and it:

1. Shows live preview of your code and if the grammar validates it
2. Automatically generates a lot of Java classes.
3. Generates JFlex lexer definition file and from that generate again a lot of Java classes

So that's what I'm using.

I won't get into too many details how to create the .bnf file, but the basic structure is:

1. Grammar-Kit configuration
2. Language keywords and other tokens (i.e braces, brackets, colons etc)
3. Grammar rules

The basic syntax is simple:

	rule_name ::= other_rule | some_token

where other_rule is, well, some other rule, pipe is OR, and some_token could be some language keyword. And so essentially every code becomes a tree of these rules and tokens, even if some rules are recursively repeated.

