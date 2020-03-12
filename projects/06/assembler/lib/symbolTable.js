"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var predefinedSymbols = {
  SP: 0,
  LCL: 1,
  ARG: 2,
  THIS: 3,
  THAT: 4,
  SCREEN: 16384,
  KBD: 24576
}; // Add R0-R15 address references

for (var i = 0; i < 16; ++i) {
  predefinedSymbols["R".concat(i)] = i;
}

var SymbolTable = function SymbolTable() {
  var _this = this;

  _classCallCheck(this, SymbolTable);

  _defineProperty(this, "table", void 0);

  _defineProperty(this, "addEntry", function (symbol, address) {
    _this.table[symbol] = address;
  });

  _defineProperty(this, "contains", function (symbol) {
    return _this.table[symbol] !== undefined;
  });

  _defineProperty(this, "getAddress", function (symbol) {
    if (!_this.contains(symbol)) {
      throw new Error("SymbolTable does not contain symbol: ".concat(symbol));
    }

    return _this.table[symbol];
  });

  this.table = predefinedSymbols;
};

var _default = SymbolTable;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zeW1ib2xUYWJsZS50cyJdLCJuYW1lcyI6WyJwcmVkZWZpbmVkU3ltYm9scyIsIlNQIiwiTENMIiwiQVJHIiwiVEhJUyIsIlRIQVQiLCJTQ1JFRU4iLCJLQkQiLCJpIiwiU3ltYm9sVGFibGUiLCJzeW1ib2wiLCJhZGRyZXNzIiwidGFibGUiLCJ1bmRlZmluZWQiLCJjb250YWlucyIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUlBLElBQU1BLGlCQUFrQyxHQUFHO0FBQzFDQyxFQUFBQSxFQUFFLEVBQUUsQ0FEc0M7QUFFMUNDLEVBQUFBLEdBQUcsRUFBRSxDQUZxQztBQUcxQ0MsRUFBQUEsR0FBRyxFQUFFLENBSHFDO0FBSTFDQyxFQUFBQSxJQUFJLEVBQUUsQ0FKb0M7QUFLMUNDLEVBQUFBLElBQUksRUFBRSxDQUxvQztBQU0xQ0MsRUFBQUEsTUFBTSxFQUFFLEtBTmtDO0FBTzFDQyxFQUFBQSxHQUFHLEVBQUU7QUFQcUMsQ0FBM0MsQyxDQVVBOztBQUNBLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxFQUFwQixFQUF3QixFQUFFQSxDQUExQixFQUE2QjtBQUM1QlIsRUFBQUEsaUJBQWlCLFlBQUtRLENBQUwsRUFBakIsR0FBNkJBLENBQTdCO0FBQ0E7O0lBRUtDLFcsR0FFTCx1QkFBYztBQUFBOztBQUFBOztBQUFBOztBQUFBLG9DQUlILFVBQUNDLE1BQUQsRUFBaUJDLE9BQWpCLEVBQTJDO0FBQ3JELElBQUEsS0FBSSxDQUFDQyxLQUFMLENBQVdGLE1BQVgsSUFBcUJDLE9BQXJCO0FBQ0EsR0FOYTs7QUFBQSxvQ0FRSCxVQUFDRCxNQUFEO0FBQUEsV0FBNkIsS0FBSSxDQUFDRSxLQUFMLENBQVdGLE1BQVgsTUFBdUJHLFNBQXBEO0FBQUEsR0FSRzs7QUFBQSxzQ0FVRCxVQUFDSCxNQUFELEVBQTRCO0FBQ3hDLFFBQUksQ0FBQyxLQUFJLENBQUNJLFFBQUwsQ0FBY0osTUFBZCxDQUFMLEVBQTRCO0FBQzNCLFlBQU0sSUFBSUssS0FBSixnREFBa0RMLE1BQWxELEVBQU47QUFDQTs7QUFFRCxXQUFPLEtBQUksQ0FBQ0UsS0FBTCxDQUFXRixNQUFYLENBQVA7QUFDQSxHQWhCYTs7QUFDYixPQUFLRSxLQUFMLEdBQWFaLGlCQUFiO0FBQ0EsQzs7ZUFpQmFTLFciLCJzb3VyY2VzQ29udGVudCI6WyJ0eXBlIFN5bWJvbFRhYmxlVHlwZSA9IHtcblx0W2tleTogc3RyaW5nXTogbnVtYmVyO1xufTtcblxuY29uc3QgcHJlZGVmaW5lZFN5bWJvbHM6IFN5bWJvbFRhYmxlVHlwZSA9IHtcblx0U1A6IDAsXG5cdExDTDogMSxcblx0QVJHOiAyLFxuXHRUSElTOiAzLFxuXHRUSEFUOiA0LFxuXHRTQ1JFRU46IDE2Mzg0LFxuXHRLQkQ6IDI0NTc2LFxufTtcblxuLy8gQWRkIFIwLVIxNSBhZGRyZXNzIHJlZmVyZW5jZXNcbmZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuXHRwcmVkZWZpbmVkU3ltYm9sc1tgUiR7aX1gXSA9IGk7XG59XG5cbmNsYXNzIFN5bWJvbFRhYmxlIHtcblx0dGFibGU6IFN5bWJvbFRhYmxlVHlwZTtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy50YWJsZSA9IHByZWRlZmluZWRTeW1ib2xzO1xuXHR9XG5cblx0YWRkRW50cnkgPSAoc3ltYm9sOiBzdHJpbmcsIGFkZHJlc3M6IG51bWJlcik6IHZvaWQgPT4ge1xuXHRcdHRoaXMudGFibGVbc3ltYm9sXSA9IGFkZHJlc3M7XG5cdH07XG5cblx0Y29udGFpbnMgPSAoc3ltYm9sOiBzdHJpbmcpOiBib29sZWFuID0+IHRoaXMudGFibGVbc3ltYm9sXSAhPT0gdW5kZWZpbmVkO1xuXG5cdGdldEFkZHJlc3MgPSAoc3ltYm9sOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuXHRcdGlmICghdGhpcy5jb250YWlucyhzeW1ib2wpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFN5bWJvbFRhYmxlIGRvZXMgbm90IGNvbnRhaW4gc3ltYm9sOiAke3N5bWJvbH1gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy50YWJsZVtzeW1ib2xdO1xuXHR9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBTeW1ib2xUYWJsZTtcbiJdfQ==