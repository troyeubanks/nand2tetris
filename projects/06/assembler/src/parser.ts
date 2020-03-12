import { ReadStream, WriteStream } from 'fs';
import readline from 'readline';

enum CommandType {
	address = 'A_COMMAND',
	computation = 'C_COMMAND',
	label = 'L_COMMAND',
}

class Parser {
	reader: readline.Interface;
	outputStream: WriteStream;
	hasStreamEnded: boolean = false;

	constructor(input: ReadStream, output: WriteStream) {
		this.outputStream = output;
		this.reader = readline.createInterface({
			input,
		});
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

	parse() {
		this.reader.on('line', (line) => {
			const trimmed = line.trim();
			if (!trimmed || trimmed.startsWith('//')) {
				return;
			}

			const instruction = trimmed.split('//')[0].replace(' ', '');
			const commandType = this.getCommandType(instruction);
			this.outputStream.write(instruction + ` -- ${commandType}\n`);
		});
	}
}

export default Parser;
