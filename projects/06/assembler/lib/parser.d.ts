/// <reference types="node" />
import { ReadStream, WriteStream } from 'fs';
import readline from 'readline';
import Code from './code';
declare class Parser {
    reader: readline.Interface;
    inputStream: ReadStream;
    outputStream: WriteStream;
    codeTranslator: Code;
    hasStreamEnded: boolean;
    constructor(input: ReadStream, output: WriteStream);
    private hasMoreCommands;
    private getCommandType;
    private computationRegex;
    private getCommandGroup;
    private generateCodeFromCommand;
    parse(): void;
}
export default Parser;
