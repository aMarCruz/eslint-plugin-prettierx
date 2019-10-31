/// <reference lib="es5"/>

// @ts-ignore
interface ObjectConstructor {
  keys<T extends {}>(obj: T): Extract<keyof T, string>[]
}

type Omit<T extends object, K> = Pick<T, Exclude<keyof T, K>>
type Dict<T = any> = { [k: string]: T }

interface DictStr {
  [k: string]: string
}

declare module '*.json' {
  const json: Dict
  export = json
}

// declare const plugin: Dict
// export = plugin

type Prettier = typeof import('prettier')

interface PrettierError extends SyntaxError {
  [k: string]: any
}

type RangeLoc = [number, number]

type RuleModule = import('eslint').Rule.RuleModule
type RuleContext = import('eslint').Rule.RuleContext
type RuleMetaData = import('eslint').Rule.RuleMetaData
