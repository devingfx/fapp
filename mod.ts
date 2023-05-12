#!/usr/bin/env -S deno run 
import { parse } from "https://deno.land/std@0.181.0/flags/mod.ts"
// CLI Flags and Positional Parameters
export const fapp = ( args: string | string[] )=> {
	args = typeof args == 'string' ? args.split(' ') : args
	const cli = parse( args )
	const params = [...cli._] as any[]
	params.unshift({...cli})
	delete params[0]._
	return params
}



const def = fapp( Deno.args )
export default def

import.meta.main
	&& console.log( def )