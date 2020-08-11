/// <reference lib="es5"/>

type Dict<T = any> = { [k: string]: T }

interface DictStr {
  [k: string]: string
}

interface ObjectConstructor {
  keys<T extends Dict>(obj: T): Extract<keyof T, string>[]
}

type Prettier = typeof import('prettier')

interface PrettierError extends SyntaxError {
  [k: string]: any
}

type RangeLoc = [number, number]

type RuleModule = import('eslint').Rule.RuleModule
type RuleContext = import('eslint').Rule.RuleContext
type RuleMetaData = import('eslint').Rule.RuleMetaData
