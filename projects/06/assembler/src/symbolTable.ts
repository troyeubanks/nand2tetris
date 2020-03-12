type SymbolTableType = {
	[key: string]: number;
};

const predefinedSymbols: SymbolTableType = {
	SP: 0,
	LCL: 1,
	ARG: 2,
	THIS: 3,
	THAT: 4,
	SCREEN: 16384,
	KBD: 24576,
};

// Add R0-R15 address references
for (let i = 0; i < 16; ++i) {
	predefinedSymbols[`R${i}`] = i;
}

class SymbolTable {
	table: SymbolTableType;
	constructor() {
		this.table = predefinedSymbols;
	}

	addEntry = (symbol: string, address: number): void => {
		this.table[symbol] = address;
	};

	contains = (symbol: string): boolean => this.table[symbol] !== undefined;

	getAddress = (symbol: string): number => {
		if (!this.contains(symbol)) {
			throw new Error(`SymbolTable does not contain symbol: ${symbol}`);
		}

		return this.table[symbol];
	};
}

export default SymbolTable;
