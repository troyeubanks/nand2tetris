"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertDecimalToBinary = void 0;

var convertDecimalToBinary = function convertDecimalToBinary(n) {
  if (n > 32767) {
    // Greater than this would not fit in 15-bits
    // Could possibly just mod by this number
    throw new Error("Address out of range: ".concat(n));
  }

  var binary = n === 0 ? '0' : '';
  var temp = n;

  while (temp > 0) {
    if (temp % 2 === 0) {
      binary = '0' + binary;
    } else {
      binary = '1' + binary;
    }

    temp = Math.floor(temp / 2);
  } // Ensures value is 15-bits


  var pad = [];

  for (var i = 15; i > binary.length; i--) {
    pad.push('0');
  }

  return pad.join('') + binary;
};

exports.convertDecimalToBinary = convertDecimalToBinary;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbImNvbnZlcnREZWNpbWFsVG9CaW5hcnkiLCJuIiwiRXJyb3IiLCJiaW5hcnkiLCJ0ZW1wIiwiTWF0aCIsImZsb29yIiwicGFkIiwiaSIsImxlbmd0aCIsInB1c2giLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBTUEsc0JBQXNCLEdBQUcsU0FBekJBLHNCQUF5QixDQUFDQyxDQUFELEVBQXVCO0FBQ3JELE1BQUlBLENBQUMsR0FBRyxLQUFSLEVBQWU7QUFDZDtBQUNBO0FBQ0EsVUFBTSxJQUFJQyxLQUFKLGlDQUFtQ0QsQ0FBbkMsRUFBTjtBQUNBOztBQUVELE1BQUlFLE1BQU0sR0FBR0YsQ0FBQyxLQUFLLENBQU4sR0FBVSxHQUFWLEdBQWdCLEVBQTdCO0FBQ0EsTUFBSUcsSUFBSSxHQUFHSCxDQUFYOztBQUVBLFNBQU9HLElBQUksR0FBRyxDQUFkLEVBQWlCO0FBQ2hCLFFBQUlBLElBQUksR0FBRyxDQUFQLEtBQWEsQ0FBakIsRUFBb0I7QUFDbkJELE1BQUFBLE1BQU0sR0FBRyxNQUFNQSxNQUFmO0FBQ0EsS0FGRCxNQUVPO0FBQ05BLE1BQUFBLE1BQU0sR0FBRyxNQUFNQSxNQUFmO0FBQ0E7O0FBQ0RDLElBQUFBLElBQUksR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdGLElBQUksR0FBRyxDQUFsQixDQUFQO0FBQ0EsR0FqQm9ELENBbUJyRDs7O0FBQ0EsTUFBTUcsR0FBRyxHQUFHLEVBQVo7O0FBQ0EsT0FBSyxJQUFJQyxDQUFDLEdBQUcsRUFBYixFQUFpQkEsQ0FBQyxHQUFHTCxNQUFNLENBQUNNLE1BQTVCLEVBQW9DRCxDQUFDLEVBQXJDLEVBQXlDO0FBQ3hDRCxJQUFBQSxHQUFHLENBQUNHLElBQUosQ0FBUyxHQUFUO0FBQ0E7O0FBRUQsU0FBT0gsR0FBRyxDQUFDSSxJQUFKLENBQVMsRUFBVCxJQUFlUixNQUF0QjtBQUNBLENBMUJEIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgY29udmVydERlY2ltYWxUb0JpbmFyeSA9IChuOiBudW1iZXIpOiBzdHJpbmcgPT4ge1xuXHRpZiAobiA+IDMyNzY3KSB7XG5cdFx0Ly8gR3JlYXRlciB0aGFuIHRoaXMgd291bGQgbm90IGZpdCBpbiAxNS1iaXRzXG5cdFx0Ly8gQ291bGQgcG9zc2libHkganVzdCBtb2QgYnkgdGhpcyBudW1iZXJcblx0XHR0aHJvdyBuZXcgRXJyb3IoYEFkZHJlc3Mgb3V0IG9mIHJhbmdlOiAke259YCk7XG5cdH1cblxuXHRsZXQgYmluYXJ5ID0gbiA9PT0gMCA/ICcwJyA6ICcnO1xuXHRsZXQgdGVtcCA9IG47XG5cblx0d2hpbGUgKHRlbXAgPiAwKSB7XG5cdFx0aWYgKHRlbXAgJSAyID09PSAwKSB7XG5cdFx0XHRiaW5hcnkgPSAnMCcgKyBiaW5hcnk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGJpbmFyeSA9ICcxJyArIGJpbmFyeTtcblx0XHR9XG5cdFx0dGVtcCA9IE1hdGguZmxvb3IodGVtcCAvIDIpO1xuXHR9XG5cblx0Ly8gRW5zdXJlcyB2YWx1ZSBpcyAxNS1iaXRzXG5cdGNvbnN0IHBhZCA9IFtdO1xuXHRmb3IgKGxldCBpID0gMTU7IGkgPiBiaW5hcnkubGVuZ3RoOyBpLS0pIHtcblx0XHRwYWQucHVzaCgnMCcpO1xuXHR9XG5cblx0cmV0dXJuIHBhZC5qb2luKCcnKSArIGJpbmFyeTtcbn07XG5cbmV4cG9ydCB7IGNvbnZlcnREZWNpbWFsVG9CaW5hcnkgfTtcbiJdfQ==