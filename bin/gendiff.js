#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
	.name('gendiff')
	.description('Compares two configuration files and shows a difference.')
	.version('11.0.0', '-v, --vers', 'output the version number')
	.helpOption('-h, --help', 'output usage information')
	.option('-f, --format <type>', 'output format')
	.parse()