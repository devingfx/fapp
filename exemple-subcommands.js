#!/usr/bin/env -S deno run 
import fapp from "https://deno.land/x/fapp/mod.ts"

export const sub = (...a)=> console.log( 'sub( ', a, ')' )
export const add = (...a)=> console.log( 'add( ', a, ')' )
export const mult = (...a)=> console.log( 'mul( ', a, ')' )

const log = ( s, ...a )=> console.log( s.join('%'), ...a )
const col = {_:'', path: 'color:cyan', warn: 'color:yellow', cmd: 'background-color:rebeccapurple;color:white', opt: 'color:grey' }

export const help = ( thisScript )=> log`
Usage: ${col.path}c${thisScript}s${col._}c [OPTIONS] ${col.cmd}c<subcommand>${col._}c [OPTIONS] <path>[ <path>[...]]
--help		Shows this help
--out		Exemple options does nothing. ${col.opt}c[Default: './dist']${col._}c
--cache		Exemple options does nothing. ${col.opt}c[Default: '.cache']${col._}c
--importmap	Exemple options does nothing. ${col.opt}c[Default: './importmap.json']${col._}c
--base		Exemple options does nothing. ${col.opt}c[Default: 'http://localhost']${col._}c
--exclude	Exemple options does nothing.
--remove	Exemple options does nothing.

Sub commands:
${col.cmd}csub${col._}c		Logs cli arguments
${col.cmd}cadd${col._}c		Logs cli arguments
${col.cmd}cmult${col._}c	Logs cli arguments
${col.cmd}chelp${col._}c	Shows this help
`

export default async function main({
	// Setup your defaults and ignore unknown flags (by not destructuring it)
	out = './dist',
	cache = '.cache',
	importmap = './importmap.json',
	base = 'http://localhost', 
	exclude,
	remove,
}, cmd, ...rest ) {
	
	switch( cmd )
	{
		case 'sub':		await sub(	{ out, cache, importmap }, 	...rest ); break
		case 'add':		await add(	{ out, cache, base }, 		...rest ); break
		case 'mult':	await mult(	{ out, cache, base }, 		...rest ); break
	
		case 'help':
		default:		await help(	import.meta.url ); break
	}
}


if( import.meta.main )
	await main( ...fapp )
