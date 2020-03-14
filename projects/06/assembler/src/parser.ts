import { ReadStream, WriteStream } from 'fs';
import readline from 'readline';

import Code from './code';
import SymbolTable from './symbolTable';
import { convertDecimalToBinary } from './util';

// remove this
const DEBUG = false;

enum CommandType {
	address = 'A_COMMAND',
	computation = 'C_COMMAND',
	label = 'L_COMMAND',
}

type CommandGroup = {
	dest: string;
	comp: string;
	jump: string;
};

class Parser {
	reader: readline.Interface;
	inputStream: ReadStream;
	outputStream: WriteStream;
	codeTranslator: Code;
	symbolTable: SymbolTable;
	fileContent: string[] = [];
	currentLine: number = 0;

	constructor(input: ReadStream, output: WriteStream) {
		this.reader = readline.createInterface({ input });
		this.inputStream = input;
		this.outputStream = output;
		this.codeTranslator = new Code();
		this.symbolTable = new SymbolTable();
	}

	private getCommandType = (command: string): CommandType => {
		if (command.includes('@')) {
			return CommandType.address;
		} else if (command.match(/[\(\)]/)) {
			return CommandType.label;
		}

		return CommandType.computation;
	};

	// Splits the command up into relevant parts based
	// dest and jump are optional
	// on format: dest=comp;jump
	private getCommandGroup = (command: string): CommandGroup => {
		let dest = 'absent';
		let comp = command;
		let jump = 'absent';
		if (command.includes('=')) {
			[dest, comp] = command.split('=');
		}

		if (comp.includes(';')) {
			[comp, jump] = comp.split(';');
		}

		return { dest, comp, jump };
	};

	private generateCodeFromCommand = (command: string): string => {
		const commandType = this.getCommandType(command);

		switch (commandType) {
			case CommandType.address:
				const cleaned = command.slice(1);
				const int = parseInt(cleaned);
				const address = int >= 0 ? int : this.symbolTable.getAddress(cleaned);

				return '0' + convertDecimalToBinary(address);
			case CommandType.computation:
				const { dest, comp, jump } = this.codeTranslator;
				const group = this.getCommandGroup(command);

				if (!comp[group.comp]) {
					throw new Error(`Invalid command: ${command}`);
				}

				return `111${comp[group.comp]}${dest[group.dest]}${jump[group.jump]}`;
			default:
				throw new Error(`Unable to generate code from ${command}`);
		}
	};

	private parse = async () => {
		return new Promise((resolve, reject) => {
			this.reader
				.on('line', (line) => {
					const trimmed = line.trim();

					// ignore comments and whitespace
					if (!trimmed || trimmed.startsWith('//')) {
						return;
					}

					// could have side-comment and inner whitespace
					const command = trimmed.split('//')[0].replace(/\s/g, '');

					const type = this.getCommandType(command);
					if (type === CommandType.label) {
						// assign label to line after
						const labelName = command.replace(/[\(\)]/g, '');
						this.symbolTable.addLabel(labelName, this.fileContent.length);
					} else {
						// potentially inefficient, might starve with huge files
						// could write to a file instead if it becomes a problem
						this.fileContent.push(command);
					}
				})
				.on('close', () => {
					resolve();
				})
				.on('error', () => {
					reject('Error parsing file');
				});
		});
	};

	public write = async () => {
		const {
			parse,
			fileContent,
			generateCodeFromCommand,
			outputStream,
			getCommandType,
		} = this;

		await parse();

		let currentLine = 0;
		let hasMoreCommands = true;
		while (hasMoreCommands) {
			const command = fileContent[currentLine];
			const type = getCommandType(command);
			const addr = command.slice(1);

			if (
				type === CommandType.address &&
				!(parseInt(addr) >= 0) &&
				!this.symbolTable.contains(addr)
			) {
				this.symbolTable.addVariable(addr);
			}

			const convertedCommand = generateCodeFromCommand(command);

			outputStream.write(
				(DEBUG ? command + ' -- ' : '') + convertedCommand + '\n'
			);

			currentLine++;
			if (currentLine >= fileContent.length) {
				hasMoreCommands = false;
			}
		}
	};
}

export default Parser;
