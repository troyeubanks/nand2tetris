declare type SymbolTableType = {
    [key: string]: number;
};
declare class SymbolTable {
    table: SymbolTableType;
    constructor();
    addEntry: (symbol: string, address: number) => void;
    contains: (symbol: string) => boolean;
    getAddress: (symbol: string) => number;
}
export default SymbolTable;
