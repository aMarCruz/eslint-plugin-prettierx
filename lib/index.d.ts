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

type PluginSettings = {
  editorconfig: boolean
  ignorePath: string
  plugins: string[]
  pluginSearchDirs: string[]
  useCache: boolean
  usePrettierrc: boolean
  withNodeModules: boolean
}

type Preset = {
 parserOptions: Dict
 settings: Dict
 rules: Dict
 extends: any[]
 plugins: any[]
}

type Presets = {
  'default': Preset
  'standardx': Preset
  'standardize': Preset
}
