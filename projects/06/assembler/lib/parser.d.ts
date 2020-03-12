/// <reference types="node" />
import { ReadStream, WriteStream } from 'fs';
import readline from 'readline';
declare class Parser {
    reader: readline.Interface;
    outputStream: WriteStream;
    hasStreamEnded: boolean;
    constructor(input: ReadStream, output: WriteStream);
    private hasMoreCommands;
    private getCommandType;
    parse(): void;
}
export default Parser;
