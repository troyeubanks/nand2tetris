import { ReadStream, WriteStream } from 'fs';
import readline from 'readline';

class Parser {
	reader: readline.Interface;
	outputStream: WriteStream;
	hasStreamEnded: boolean = false;

	constructor(input: ReadStream, output: WriteStream) {
		this.outputStream = output;
		this.reader = readline.createInterface({
			input,
			output,
		});
	}

	hasMoreCommands = (): boolean => this.hasStreamEnded;

	parse() {
		this.reader.on('line', (line) => {
			console.log('line: ', line);
			this.outputStream.write(line + ' -- modified\n');
		});
	}
}

export default Parser;
