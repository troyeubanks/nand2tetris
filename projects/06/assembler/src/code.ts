type StringMap = {
	[code: string]: string;
};

/**
 * Address/Computation instruction module
 *
 * A-instruction format:
 * @value
 * Represents setting the address register to a 15-bit memory location
 * 0vvv vvvv vvvv vvvv
 * v = 0 or 1
 *
 * C-instruction format:
 * dest=comp;jump
 * dest or jump may be empty
 * If dest is empty, '=' is omitted
 * If jump is empty, ';' is omitted
 * a-bit is 1 when command uses M, 0 when it uses A
 *      1234 5612 3123
 * 111a cccc ccdd djjj
 */

class Code {
	private generateCompMap = (): StringMap => {
		const codeTranslation: { [code: string]: string[] } = {
			'101010': ['0'],
			'111111': ['1'],
			'111010': ['-1'],
			'001100': ['D'],
			'110000': ['A', 'M'],
			'001101': ['!D'],
			'110001': ['!A', '!M'],
			'001111': ['-D'],
			'110011': ['-A', '-M'],
			'011111': ['D+1', '1+D'],
			'110111': ['A+1', '1+A', 'M+1', '1+M'],
			'001110': ['D-1'],
			'110010': ['A-1', 'M-1'],
			'000010': ['D+A', 'A+D', 'D+M', 'M+D'],
			'010011': ['D-A', 'D-M'],
			'000111': ['A-D', 'M-D'],
			'000000': ['D&A', 'D&M'],
			'010101': ['D|A', 'D|M'],
		};

		return Object.keys(codeTranslation).reduce((acc: StringMap, code) => {
			const commands = codeTranslation[code];
			commands.forEach((c) => {
				const aBit = c.includes('M') ? '1' : '0';
				acc[c] = aBit + code;
			});

			return acc;
		}, {});
	};

	// Maps
	public readonly jump: StringMap = {
		absent: '000',
		JGT: '001',
		JEQ: '010',
		JGE: '011',
		JLT: '100',
		JNE: '101',
		JLE: '110',
		JMP: '111',
	};

	public readonly dest: StringMap = {
		absent: '000',
		M: '001',
		D: '010',
		MD: '011',
		A: '100',
		AM: '101',
		AD: '110',
		AMD: '111',
	};

	public readonly comp = this.generateCompMap();
}

export default Code;
