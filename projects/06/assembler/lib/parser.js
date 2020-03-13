"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _readline = _interopRequireDefault(require("readline"));

var _code = _interopRequireDefault(require("./code"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _wrapRegExp(re, groups) { _wrapRegExp = function _wrapRegExp(re, groups) { return new BabelRegExp(re, undefined, groups); }; var _RegExp = _wrapNativeSuper(RegExp); var _super = RegExp.prototype; var _groups = new WeakMap(); function BabelRegExp(re, flags, groups) { var _this = _RegExp.call(this, re, flags); _groups.set(_this, groups || _groups.get(re)); return _this; } _inherits(BabelRegExp, _RegExp); BabelRegExp.prototype.exec = function (str) { var result = _super.exec.call(this, str); if (result) result.groups = buildGroups(result, this); return result; }; BabelRegExp.prototype[Symbol.replace] = function (str, substitution) { if (typeof substitution === "string") { var groups = _groups.get(this); return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) { return "$" + groups[name]; })); } else if (typeof substitution === "function") { var _this = this; return _super[Symbol.replace].call(this, str, function () { var args = []; args.push.apply(args, arguments); if (_typeof(args[args.length - 1]) !== "object") { args.push(buildGroups(args, _this)); } return substitution.apply(this, args); }); } else { return _super[Symbol.replace].call(this, str, substitution); } }; function buildGroups(result, re) { var g = _groups.get(re); return Object.keys(g).reduce(function (groups, name) { groups[name] = result[g[name]]; return groups; }, Object.create(null)); } return _wrapRegExp.apply(this, arguments); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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

    _defineProperty(this, "inputStream", void 0);

    _defineProperty(this, "outputStream", void 0);

    _defineProperty(this, "codeTranslator", void 0);

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

    _defineProperty(this, "computationRegex", /*#__PURE__*/_wrapRegExp(/([ADM]*)=?([\0-\x08\x0E-\x1F!-:<-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uFEFE\uFF00-\uFFFF]*);?([A-Z]*)/, {
      dest: 1,
      comp: 2,
      jump: 3
    }));

    _defineProperty(this, "getCommandGroup", function (command) {
      var match = command.match(_this.computationRegex);

      if (!match || !match.groups) {
        throw new Error("Unable to parse expression: ".concat(command));
      }

      var _match$groups = match.groups,
          dest = _match$groups.dest,
          comp = _match$groups.comp,
          jump = _match$groups.jump;
      return {
        dest: dest === '' ? 'null' : dest,
        comp: comp === '' ? 'null' : comp,
        jump: jump === '' ? 'null' : jump
      };
    });

    _defineProperty(this, "generateCodeFromCommand", function (command) {
      var commandType = _this.getCommandType(command);

      switch (commandType) {
        case CommandType.address:
          // need to add symbolTable lookup
          return '0' + (0, _util.convertDecimalToBinary)(parseInt(command.slice(1)));

        case CommandType.label:
          // return address of line after label
          return '';

        case CommandType.computation:
          var _this$codeTranslator = _this.codeTranslator,
              dest = _this$codeTranslator.dest,
              comp = _this$codeTranslator.comp,
              jump = _this$codeTranslator.jump;

          var group = _this.getCommandGroup(command);

          return "111".concat(comp[group.comp]).concat(dest[group.dest]).concat(jump[group.jump]);

        default:
          throw new Error("Invalid command: ".concat(command));
      }
    });

    this.reader = _readline["default"].createInterface({
      input: input
    });
    this.inputStream = input;
    this.outputStream = output;
    this.codeTranslator = new _code["default"]();
  }

  _createClass(Parser, [{
    key: "parse",
    value: function parse() {
      var outputStream = this.outputStream,
          reader = this.reader,
          generateCodeFromCommand = this.generateCodeFromCommand;
      reader.on('line', function (l) {
        var trimmed = l.trim();

        if (!trimmed || trimmed.startsWith('//')) {
          return;
        }

        var instruction = trimmed.split('//')[0].replace(' ', '');
        var convertedInstruction = generateCodeFromCommand(instruction);
        outputStream.write(convertedInstruction + '\n');
      });
    }
  }]);

  return Parser;
}();

var _default = Parser;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYXJzZXIudHMiXSwibmFtZXMiOlsiQ29tbWFuZFR5cGUiLCJQYXJzZXIiLCJpbnB1dCIsIm91dHB1dCIsImhhc1N0cmVhbUVuZGVkIiwiaW5zdHJ1Y3Rpb24iLCJhZGRyZXNzIiwibGFiZWwiLCJjb21wdXRhdGlvbiIsImNvbW1hbmQiLCJtYXRjaCIsImNvbXB1dGF0aW9uUmVnZXgiLCJncm91cHMiLCJFcnJvciIsImRlc3QiLCJjb21wIiwianVtcCIsImNvbW1hbmRUeXBlIiwiZ2V0Q29tbWFuZFR5cGUiLCJwYXJzZUludCIsInNsaWNlIiwiY29kZVRyYW5zbGF0b3IiLCJncm91cCIsImdldENvbW1hbmRHcm91cCIsInJlYWRlciIsInJlYWRsaW5lIiwiY3JlYXRlSW50ZXJmYWNlIiwiaW5wdXRTdHJlYW0iLCJvdXRwdXRTdHJlYW0iLCJDb2RlIiwiZ2VuZXJhdGVDb2RlRnJvbUNvbW1hbmQiLCJvbiIsImwiLCJ0cmltbWVkIiwidHJpbSIsInN0YXJ0c1dpdGgiLCJzcGxpdCIsInJlcGxhY2UiLCJjb252ZXJ0ZWRJbnN0cnVjdGlvbiIsIndyaXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFS0EsVzs7V0FBQUEsVztBQUFBQSxFQUFBQSxXO0FBQUFBLEVBQUFBLFc7QUFBQUEsRUFBQUEsVztHQUFBQSxXLEtBQUFBLFc7O0lBWUNDLE07QUFPTCxrQkFBWUMsS0FBWixFQUErQkMsTUFBL0IsRUFBb0Q7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQSw0Q0FGMUIsS0FFMEI7O0FBQUEsNkNBTzFCO0FBQUEsYUFBZSxLQUFJLENBQUNDLGNBQXBCO0FBQUEsS0FQMEI7O0FBQUEsNENBUzNCLFVBQUNDLFdBQUQsRUFBc0M7QUFDOUQsY0FBUUEsV0FBVyxDQUFDLENBQUQsQ0FBbkI7QUFDQyxhQUFLLEdBQUw7QUFDQyxpQkFBT0wsV0FB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LElBQVlBLE9BQU8sQ0FBQ0UsVUFBUixDQUFtQixJQUFuQixDQUFoQixFQUEwQztBQUN6QztBQUNBOztBQUVELFlBQU05QixXQUFXLEdBQUc0QixPQUFPLENBQUNHLEtBQVIsQ0FBYyxJQUFkLEVBQW9CLENBQXBCLEVBQXVCQyxPQUF2QixDQUErQixHQUEvQixFQUFvQyxFQUFwQyxDQUFwQjtBQUNBLFlBQU1DLG9CQUFvQixHQUFHUix1QkFBdUIsQ0FBQ3pCLFdBQUQsQ0FBcEQ7QUFFQXVCLFFBQUFBLFlBQVksQ0FBQ1csS0FBYixDQUFtQkQsb0JBQW9CLEdBQUcsSUFBMUM7QUFDQSxPQVZEO0FBV0E7Ozs7OztlQUdhckMsTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlYWRTdHJlYW0sIFdyaXRlU3RyZWFtIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHJlYWRsaW5lIGZyb20gJ3JlYWRsaW5lJztcbmltcG9ydCBDb2RlIGZyb20gJy4vY29kZSc7XG5pbXBvcnQgeyBjb252ZXJ0RGVjaW1hbFRvQmluYXJ5IH0gZnJvbSAnLi91dGlsJztcblxuZW51bSBDb21tYW5kVHlwZSB7XG5cdGFkZHJlc3MgPSAnQV9DT01NQU5EJyxcblx0Y29tcHV0YXRpb24gPSAnQ19DT01NQU5EJyxcblx0bGFiZWwgPSAnTF9DT01NQU5EJyxcbn1cblxudHlwZSBDb21tYW5kR3JvdXAgPSB7XG5cdGRlc3Q6IHN0cmluZztcblx0Y29tcDogc3RyaW5nO1xuXHRqdW1wOiBzdHJpbmc7XG59O1xuXG5jbGFzcyBQYXJzZXIge1xuXHRyZWFkZXI6IHJlYWRsaW5lLkludGVyZmFjZTtcblx0aW5wdXRTdHJlYW06IFJlYWRTdHJlYW07XG5cdG91dHB1dFN0cmVhbTogV3JpdGVTdHJlYW07XG5cdGNvZGVUcmFuc2xhdG9yOiBDb2RlO1xuXHRoYXNTdHJlYW1FbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cdGNvbnN0cnVjdG9yKGlucHV0OiBSZWFkU3RyZWFtLCBvdXRwdXQ6IFdyaXRlU3RyZWFtKSB7XG5cdFx0dGhpcy5yZWFkZXIgPSByZWFkbGluZS5jcmVhdGVJbnRlcmZhY2UoeyBpbnB1dCB9KTtcblx0XHR0aGlzLmlucHV0U3RyZWFtID0gaW5wdXQ7XG5cdFx0dGhpcy5vdXRwdXRTdHJlYW0gPSBvdXRwdXQ7XG5cdFx0dGhpcy5jb2RlVHJhbnNsYXRvciA9IG5ldyBDb2RlKCk7XG5cdH1cblxuXHRwcml2YXRlIGhhc01vcmVDb21tYW5kcyA9ICgpOiBib29sZWFuID0+IHRoaXMuaGFzU3RyZWFtRW5kZWQ7XG5cblx0cHJpdmF0ZSBnZXRDb21tYW5kVHlwZSA9IChpbnN0cnVjdGlvbjogc3RyaW5nKTogQ29tbWFuZFR5cGUgPT4ge1xuXHRcdHN3aXRjaCAoaW5zdHJ1Y3Rpb25bMF0pIHtcblx0XHRcdGNhc2UgJ0AnOlxuXHRcdFx0XHRyZXR1cm4gQ29tbWFuZFR5cGUuYWRkcmVzcztcblx0XHRcdGNhc2UgJygnOlxuXHRcdFx0XHRyZXR1cm4gQ29tbWFuZFR5cGUubGFiZWw7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gQ29tbWFuZFR5cGUuY29tcHV0YXRpb247XG5cdFx0fVxuXHR9O1xuXG5cdC8vIFNwbGl0cyB0aGUgY29tbWFuZCB1cCBpbnRvIHJlbGV2YW50IHBhcnRzIGJhc2VkXG5cdC8vIG9uIGZvcm1hdDogZGVzdD1jb21wO2p1bXBcblx0cHJpdmF0ZSBjb21wdXRhdGlvblJlZ2V4ID0gLyg/PGRlc3Q+W0FETV0qKT0/KD88Y29tcD5bXjtcXHNdKik7Pyg/PGp1bXA+W0EtWl0qKS87XG5cdHByaXZhdGUgZ2V0Q29tbWFuZEdyb3VwID0gKGNvbW1hbmQ6IHN0cmluZyk6IENvbW1hbmRHcm91cCA9PiB7XG5cdFx0Y29uc3QgbWF0Y2ggPSBjb21tYW5kLm1hdGNoKHRoaXMuY29tcHV0YXRpb25SZWdleCk7XG5cblx0XHRpZiAoIW1hdGNoIHx8ICFtYXRjaC5ncm91cHMpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIHBhcnNlIGV4cHJlc3Npb246ICR7Y29tbWFuZH1gKTtcblx0XHR9XG5cblx0XHRjb25zdCB7IGRlc3QsIGNvbXAsIGp1bXAgfSA9IG1hdGNoLmdyb3VwcztcblxuXHRcdHJldHVybiB7XG5cdFx0XHRkZXN0OiBkZXN0ID09PSAnJyA/ICdudWxsJyA6IGRlc3QsXG5cdFx0XHRjb21wOiBjb21wID09PSAnJyA/ICdudWxsJyA6IGNvbXAsXG5cdFx0XHRqdW1wOiBqdW1wID09PSAnJyA/ICdudWxsJyA6IGp1bXAsXG5cdFx0fTtcblx0fTtcblxuXHRwcml2YXRlIGdlbmVyYXRlQ29kZUZyb21Db21tYW5kID0gKGNvbW1hbmQ6IHN0cmluZyk6IHN0cmluZyA9PiB7XG5cdFx0Y29uc3QgY29tbWFuZFR5cGUgPSB0aGlzLmdldENvbW1hbmRUeXBlKGNvbW1hbmQpO1xuXG5cdFx0c3dpdGNoIChjb21tYW5kVHlwZSkge1xuXHRcdFx0Y2FzZSBDb21tYW5kVHlwZS5hZGRyZXNzOlxuXHRcdFx0XHQvLyBuZWVkIHRvIGFkZCBzeW1ib2xUYWJsZSBsb29rdXBcblx0XHRcdFx0cmV0dXJuICcwJyArIGNvbnZlcnREZWNpbWFsVG9CaW5hcnkocGFyc2VJbnQoY29tbWFuZC5zbGljZSgxKSkpO1xuXHRcdFx0Y2FzZSBDb21tYW5kVHlwZS5sYWJlbDpcblx0XHRcdFx0Ly8gcmV0dXJuIGFkZHJlc3Mgb2YgbGluZSBhZnRlciBsYWJlbFxuXHRcdFx0XHRyZXR1cm4gJyc7XG5cdFx0XHRjYXNlIENvbW1hbmRUeXBlLmNvbXB1dGF0aW9uOlxuXHRcdFx0XHRjb25zdCB7IGRlc3QsIGNvbXAsIGp1bXAgfSA9IHRoaXMuY29kZVRyYW5zbGF0b3I7XG5cdFx0XHRcdGNvbnN0IGdyb3VwID0gdGhpcy5nZXRDb21tYW5kR3JvdXAoY29tbWFuZCk7XG5cblx0XHRcdFx0cmV0dXJuIGAxMTEke2NvbXBbZ3JvdXAuY29tcF19JHtkZXN0W2dyb3VwLmRlc3RdfSR7anVtcFtncm91cC5qdW1wXX1gO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNvbW1hbmQ6ICR7Y29tbWFuZH1gKTtcblx0XHR9XG5cdH07XG5cblx0cGFyc2UoKSB7XG5cdFx0Y29uc3QgeyBvdXRwdXRTdHJlYW0sIHJlYWRlciwgZ2VuZXJhdGVDb2RlRnJvbUNvbW1hbmQgfSA9IHRoaXM7XG5cblx0XHRyZWFkZXIub24oJ2xpbmUnLCAobCkgPT4ge1xuXHRcdFx0Y29uc3QgdHJpbW1lZCA9IGwudHJpbSgpO1xuXHRcdFx0aWYgKCF0cmltbWVkIHx8IHRyaW1tZWQuc3RhcnRzV2l0aCgnLy8nKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGluc3RydWN0aW9uID0gdHJpbW1lZC5zcGxpdCgnLy8nKVswXS5yZXBsYWNlKCcgJywgJycpO1xuXHRcdFx0Y29uc3QgY29udmVydGVkSW5zdHJ1Y3Rpb24gPSBnZW5lcmF0ZUNvZGVGcm9tQ29tbWFuZChpbnN0cnVjdGlvbik7XG5cblx0XHRcdG91dHB1dFN0cmVhbS53cml0ZShjb252ZXJ0ZWRJbnN0cnVjdGlvbiArICdcXG4nKTtcblx0XHR9KTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBQYXJzZXI7XG4iXX0=