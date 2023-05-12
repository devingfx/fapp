# FAPP
> **F**lags **A**nd **P**ositional **P**arameters

**fapp** is a convention of how pass command line arguments to functions.

The pattern is: 
- A plein Array
	- with flags first
	- then positional parameters

Where `flags` is an `Object` and patameters an `Array`:

```javascript
[ flags: Object, ...positionalArguments: string[] ]
```

This can be easily collected into an Array to pass it to another sub function:

```javascript
( ...fapp )=> another( ...fapp )
```

Or destructured/reorganised to use it right now:

```javascript
( { flag1, flag2 }, firstWordCommand, ...rest )=>

	firstWordCommand == 'sub' && flag1
		? subCommand( { flag2 }, ...rest )

	:firstWordCommand == 'foo' && flag2
		? fooCommand( { flag1, bar: 'baz' }, rest[0] )
	
	:help()
```

## Why?

- Javascript rest parameter ( aka `...varname` ) must be last argument,
so a command that can act on 1 or more targets are likely to use a rest parameter.
- Options object to be destructured is a usal pattern.

## Usages

### Deno
Imports the named export `{ fapp }` that is the parsing function:
```javascript
import { fapp } from 'x/fapp/mod.ts'

if( itShouldExecuteCommands )
	myCommand( ...fapp(ARGV) )
```
Or imports the default's value that is the `Deno.args` already parsed:
```javascript
import fapp from 'x/fapp/mod.ts'
const [ flags, ...params ] = fapp

flags.foo ? stuff(params[0]) : params.map( other )
```
> Note you can rename the fapp array as you like
```javascript
import I_LIKE_CONST_CASE_NAMES from 'x/fapp/mod.ts'
```
A more complete exemple:
```javascript
import fapp from 'x/fapp/mod.ts'

export const main = ( { help, format }, command, ...operands )=>
	
	help || command == 'help'
		? usage( { help, format }, command, ...operands )
	
	:command == 'sub' && operands.length > 1 && format
		? subtract( ...operands ).formatTo( format )
	
	:command == 'add' && operands.length > 1 && format
		? add( ...operands ).formatTo( format )
	
	:usage()

import.meta.main
	&& main( ...fapp )
```
Here, `fapp` module is always loaded, and `Deno.args` always parsed.

If you want to avoid that to mix a standart libray module that only exports things to be imported and an executable file, you can dynamcaly import only 
if this scrit is the main module:


```javascript
export const myAwesomeCommand = ()=> 42

export const help = ()=> '...'

import.meta.main && await import('x/fapp/mod.ts').then(
	({ default: [ flags, ...params ] })=>

		flags.help ? help()

		:params.map( path=> myAwesomeCommand( flags, path ) )

)
```
Here because of `import.meta.main && ` that act as a `if`, nothing is loaded/parsed when this file is imported by another module...