import * as fs from 'fs';
import path from 'path';
import 'regenerator-runtime/runtime.js';

import Parser from './parser';

const validateFile = (file: string): void => {
	if (!fs.existsSync(file)) {
		throw new Error(`File does not exist: ${file}`);
	}
};

const assemble = () => {
	const assemblyFile = process.argv[2];
	validateFile(assemblyFile);

	const inputStream = fs.createReadStream(assemblyFile);
	const outputStream = fs.createWriteStream(
		`./dist/${path.basename(assemblyFile, path.extname(assemblyFile))}.hack`
	);

	const parser = new Parser(inputStream, outputStream);

	parser.write();
};

assemble();
