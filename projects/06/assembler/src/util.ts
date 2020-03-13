const convertDecimalToBinary = (n: number): string => {
	if (n > 32767) {
		// Greater than this would not fit in 15-bits
		// Could possibly just mod by this number
		throw new Error(`Address out of range: ${n}`);
	}

	let binary = n === 0 ? '0' : '';
	let temp = n;

	while (temp > 0) {
		if (temp % 2 === 0) {
			binary = '0' + binary;
		} else {
			binary = '1' + binary;
		}
		temp = Math.floor(temp / 2);
	}

	// Ensures value is 15-bits
	const pad = [];
	for (let i = 15; i > binary.length; i--) {
		pad.push('0');
	}

	return pad.join('') + binary;
};

export { convertDecimalToBinary };
