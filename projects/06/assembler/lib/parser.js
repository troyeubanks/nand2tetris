"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _readline = _interopRequireDefault(require("readline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CommandType;

(function (CommandType) {
  CommandType["address"] = "A_COMMAND";
  CommandType["computation"] = "C_COMMAND";
  CommandType["label"] = "L_COMMAND";
})(CommandType || (CommandType = {}));

var Parser = /*#__PURE__*/function () {
  function Parser(input, output) {
    var _this = this;

    _classCallCheck(this, Parser);

    _defineProperty(this, "reader", void 0);

    _defineProperty(this, "outputStream", void 0);

    _defineProperty(this, "hasStreamEnded", false);

    _defineProperty(this, "hasMoreCommands", function () {
      return _this.hasStreamEnded;
    });

    _defineProperty(this, "getCommandType", function (instruction) {
      switch (instruction[0]) {
        case '@':
          return CommandType.address;

        case '(':
          return CommandType.label;

        default:
          return CommandType.computation;
      }
    });

    this.outputStream = output;
    this.reader = _readline["default"].createInterface({
      input: input,
      output: output
    });
  }

  _createClass(Parser, [{
    key: "parse",
    value: function parse() {
      var _this2 = this;

      this.reader.on('line', function (line) {
        var trimmed = line.trim();

        if (!trimmed || trimmed.startsWith('//')) {
          return;
        }

        var instruction = trimmed.split('//')[0].replace(' ', '');

        var commandType = _this2.getCommandType(instruction);

        _this2.outputStream.write(instruction + " -- ".concat(commandType, "\n"));
      });
    }
  }]);

  return Parser;
}();

var _default = Parser;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYXJzZXIudHMiXSwibmFtZXMiOlsiQ29tbWFuZFR5cGUiLCJQYXJzZXIiLCJpbnB1dCIsIm91dHB1dCIsImhhc1N0cmVhbUVuZGVkIiwiaW5zdHJ1Y3Rpb24iLCJhZGRyZXNzIiwibGFiZWwiLCJjb21wdXRhdGlvbiIsIm91dHB1dFN0cmVhbSIsInJlYWRlciIsInJlYWRsaW5lIiwiY3JlYXRlSW50ZXJmYWNlIiwib24iLCJsaW5lIiwidHJpbW1lZCIsInRyaW0iLCJzdGFydHNXaXRoIiwic3BsaXQiLCJyZXBsYWNlIiwiY29tbWFuZFR5cGUiLCJnZXRDb21tYW5kVHlwZSIsIndyaXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVLQSxXOztXQUFBQSxXO0FBQUFBLEVBQUFBLFc7QUFBQUEsRUFBQUEsVztBQUFBQSxFQUFBQSxXO0dBQUFBLFcsS0FBQUEsVzs7SUFNQ0MsTTtBQUtMLGtCQUFZQyxLQUFaLEVBQStCQyxNQUEvQixFQUFvRDtBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBLDRDQUYxQixLQUUwQjs7QUFBQSw2Q0FRMUI7QUFBQSxhQUFlLEtBQUksQ0FBQ0MsY0FBcEI7QUFBQSxLQVIwQjs7QUFBQSw0Q0FVM0IsVUFBQ0MsV0FBRCxFQUFzQztBQUM5RCxjQUFRQSxXQUFXLENBQUMsQ0FBRCxDQUFuQjtBQUNDLGFBQUssR0FBTDtBQUNDLGlCQUFPTCxXQUFXLENBQUNNLE9BQW5COztBQUNELGFBQUssR0FBTDtBQUNDLGlCQUFPTixXQUFXLENBQUNPLEtBQW5COztBQUNEO0FBQ0MsaUJBQU9QLFdBQVcsQ0FBQ1EsV0FBbkI7QUFORjtBQVFBLEtBbkJtRDs7QUFDbkQsU0FBS0MsWUFBTCxHQUFvQk4sTUFBcEI7QUFDQSxTQUFLTyxNQUFMLEdBQWNDLHFCQUFTQyxlQUFULENBQXlCO0FBQ3RDVixNQUFBQSxLQUFLLEVBQUxBLEtBRHNDO0FBRXRDQyxNQUFBQSxNQUFNLEVBQU5BO0FBRnNDLEtBQXpCLENBQWQ7QUFJQTs7Ozs0QkFlTztBQUFBOztBQUNQLFdBQUtPLE1BQUwsQ0FBWUcsRUFBWixDQUFlLE1BQWYsRUFBdUIsVUFBQ0MsSUFBRCxFQUFVO0FBQ2hDLFlBQU1DLE9BQU8sR0FBR0QsSUFBSSxDQUFDRSxJQUFMLEVBQWhCOztBQUNBLFlBQUksQ0FBQ0QsT0FBRCxJQUFZQSxPQUFPLENBQUNFLFVBQVIsQ0FBbUIsSUFBbkIsQ0FBaEIsRUFBMEM7QUFDekM7QUFDQTs7QUFFRCxZQUFNWixXQUFXLEdBQUdVLE9BQU8sQ0FBQ0csS0FBUixDQUFjLElBQWQsRUFBb0IsQ0FBcEIsRUFBdUJDLE9BQXZCLENBQStCLEdBQS9CLEVBQW9DLEVBQXBDLENBQXBCOztBQUNBLFlBQU1DLFdBQVcsR0FBRyxNQUFJLENBQUNDLGNBQUwsQ0FBb0JoQixXQUFwQixDQUFwQjs7QUFDQSxRQUFBLE1BQUksQ0FBQ0ksWUFBTCxDQUFrQmEsS0FBbEIsQ0FBd0JqQixXQUFXLGlCQUFVZSxXQUFWLE9BQW5DO0FBQ0EsT0FURDtBQVVBOzs7Ozs7ZUFHYW5CLE0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWFkU3RyZWFtLCBXcml0ZVN0cmVhbSB9IGZyb20gJ2ZzJztcbmltcG9ydCByZWFkbGluZSBmcm9tICdyZWFkbGluZSc7XG5cbmVudW0gQ29tbWFuZFR5cGUge1xuXHRhZGRyZXNzID0gJ0FfQ09NTUFORCcsXG5cdGNvbXB1dGF0aW9uID0gJ0NfQ09NTUFORCcsXG5cdGxhYmVsID0gJ0xfQ09NTUFORCcsXG59XG5cbmNsYXNzIFBhcnNlciB7XG5cdHJlYWRlcjogcmVhZGxpbmUuSW50ZXJmYWNlO1xuXHRvdXRwdXRTdHJlYW06IFdyaXRlU3RyZWFtO1xuXHRoYXNTdHJlYW1FbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cdGNvbnN0cnVjdG9yKGlucHV0OiBSZWFkU3RyZWFtLCBvdXRwdXQ6IFdyaXRlU3RyZWFtKSB7XG5cdFx0dGhpcy5vdXRwdXRTdHJlYW0gPSBvdXRwdXQ7XG5cdFx0dGhpcy5yZWFkZXIgPSByZWFkbGluZS5jcmVhdGVJbnRlcmZhY2Uoe1xuXHRcdFx0aW5wdXQsXG5cdFx0XHRvdXRwdXQsXG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIGhhc01vcmVDb21tYW5kcyA9ICgpOiBib29sZWFuID0+IHRoaXMuaGFzU3RyZWFtRW5kZWQ7XG5cblx0cHJpdmF0ZSBnZXRDb21tYW5kVHlwZSA9IChpbnN0cnVjdGlvbjogc3RyaW5nKTogQ29tbWFuZFR5cGUgPT4ge1xuXHRcdHN3aXRjaCAoaW5zdHJ1Y3Rpb25bMF0pIHtcblx0XHRcdGNhc2UgJ0AnOlxuXHRcdFx0XHRyZXR1cm4gQ29tbWFuZFR5cGUuYWRkcmVzcztcblx0XHRcdGNhc2UgJygnOlxuXHRcdFx0XHRyZXR1cm4gQ29tbWFuZFR5cGUubGFiZWw7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gQ29tbWFuZFR5cGUuY29tcHV0YXRpb247XG5cdFx0fVxuXHR9O1xuXG5cdHBhcnNlKCkge1xuXHRcdHRoaXMucmVhZGVyLm9uKCdsaW5lJywgKGxpbmUpID0+IHtcblx0XHRcdGNvbnN0IHRyaW1tZWQgPSBsaW5lLnRyaW0oKTtcblx0XHRcdGlmICghdHJpbW1lZCB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoJy8vJykpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBpbnN0cnVjdGlvbiA9IHRyaW1tZWQuc3BsaXQoJy8vJylbMF0ucmVwbGFjZSgnICcsICcnKTtcblx0XHRcdGNvbnN0IGNvbW1hbmRUeXBlID0gdGhpcy5nZXRDb21tYW5kVHlwZShpbnN0cnVjdGlvbik7XG5cdFx0XHR0aGlzLm91dHB1dFN0cmVhbS53cml0ZShpbnN0cnVjdGlvbiArIGAgLS0gJHtjb21tYW5kVHlwZX1cXG5gKTtcblx0XHR9KTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBQYXJzZXI7XG4iXX0=