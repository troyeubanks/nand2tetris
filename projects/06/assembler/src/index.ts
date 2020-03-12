import * as fs from 'fs';
import child_process from 'child_process';

// Local imports
import Parser from './parser';
// import SymbolTable from './symbolTable'

const validateFile = (file: string): void => {
	if (!fs.existsSync(file)) {
		throw new Error(`File does not exist: ${file}`);
	}
};

const assemblyFile = process.argv[2];
validateFile(assemblyFile);

const inputStream = fs.createReadStream(assemblyFile);
const outputStream = fs.createWriteStream('./dist/test.txt');

const parser = new Parser(inputStream, outputStream);

parser.parse();
