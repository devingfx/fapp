#!/usr/bin/env -S deno run --allow-net

export const myAwesomeCommand = (...a)=> console.log( 'Awesome! ', a )

export const help = ( thisScript )=> console.log(`
Usage: ${thisScript} [OPTIONS] <path>[ <path>[...]]
--help		Shows this help
`)

import.meta.main && await import('https://deno.land/x/fapp/mod.ts').then(
	({ default: [ flags, ...params ] })=>

		flags.help ? help( import.meta.url, flags, ...params )	// pass it flags and parameters to customize help

		:params.map( path=> myAwesomeCommand( flags, path ) )

)