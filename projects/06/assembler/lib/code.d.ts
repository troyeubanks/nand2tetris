declare type StringMap = {
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
declare class Code {
    private generateCompMap;
    readonly jump: StringMap;
    readonly dest: StringMap;
    readonly comp: StringMap;
}
export default Code;
