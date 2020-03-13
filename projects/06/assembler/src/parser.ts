import { ReadStream, WriteStream } from 'fs';
import readline from 'readline';
import Code from './code';
import { convertDecimalToBinary } from './util';

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
	hasStreamEnded: boolean = false;

	constructor(input: ReadStream, output: WriteStream) {
		this.reader = readline.createInterface({ input });
		this.inputStream = input;
		this.outputStream = output;
		this.codeTranslator = new Code();
	}

	private hasMoreCommands = (): boolean => this.hasStreamEnded;

	private getCommandType = (instruction: string): CommandType => {
		switch (instruction[0]) {
			case '@':
				return CommandType.address;
			case '(':
				return CommandType.label;
			default:
				return CommandType.computation;
		}
	};

	// Splits the command up into relevant parts based
	// on format: dest=comp;jump
	private computationRegex = /(?<dest>[ADM]*)=?(?<comp>[^;\s]*);?(?<jump>[A-Z]*)/;
	private getCommandGroup = (command: string): CommandGroup => {
		const match = command.match(this.computationRegex);

		if (!match || !match.groups) {
			throw new Error(`Unable to parse expression: ${command}`);
		}

		const { dest, comp, jump } = match.groups;

		return {
			dest: dest === '' ? 'null' : dest,
			comp: comp === '' ? 'null' : comp,
			jump: jump === '' ? 'null' : jump,
		};
	};

	private generateCodeFromCommand = (command: string): string => {
		const commandType = this.getCommandType(command);

		switch (commandType) {
			case CommandType.address:
				// need to add symbolTable lookup
				return '0' + convertDecimalToBinary(parseInt(command.slice(1)));
			case CommandType.label:
				// return address of line after label
				return '';
			case CommandType.computation:
				const { dest, comp, jump } = this.codeTranslator;
				const group = this.getCommandGroup(command);

				return `111${comp[group.comp]}${dest[group.dest]}${jump[group.jump]}`;
			default:
				throw new Error(`Invalid command: ${command}`);
		}
	};

	parse() {
		const { outputStream, reader, generateCodeFromCommand } = this;

		reader.on('line', (l) => {
			const trimmed = l.trim();
			if (!trimmed || trimmed.startsWith('//')) {
				return;
			}

			const instruction = trimmed.split('//')[0].replace(' ', '');
			const convertedInstruction = generateCodeFromCommand(instruction);

			outputStream.write(convertedInstruction + '\n');
		});
	}
}

export default Parser;
