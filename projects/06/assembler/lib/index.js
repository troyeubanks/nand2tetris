'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = require('fs');
var readline = _interopDefault(require('readline'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _wrapRegExp(re, groups) {
  _wrapRegExp = function (re, groups) {
    return new BabelRegExp(re, undefined, groups);
  };

  var _RegExp = _wrapNativeSuper(RegExp);

  var _super = RegExp.prototype;

  var _groups = new WeakMap();

  function BabelRegExp(re, flags, groups) {
    var _this = _RegExp.call(this, re, flags);

    _groups.set(_this, groups || _groups.get(re));

    return _this;
  }

  _inherits(BabelRegExp, _RegExp);

  BabelRegExp.prototype.exec = function (str) {
    var result = _super.exec.call(this, str);

    if (result) result.groups = buildGroups(result, this);
    return result;
  };

  BabelRegExp.prototype[Symbol.replace] = function (str, substitution) {
    if (typeof substitution === "string") {
      var groups = _groups.get(this);

      return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) {
        return "$" + groups[name];
      }));
    } else if (typeof substitution === "function") {
      var _this = this;

      return _super[Symbol.replace].call(this, str, function () {
        var args = [];
        args.push.apply(args, arguments);

        if (typeof args[args.length - 1] !== "object") {
          args.push(buildGroups(args, _this));
        }

        return substitution.apply(this, args);
      });
    } else {
      return _super[Symbol.replace].call(this, str, substitution);
    }
  };

  function buildGroups(result, re) {
    var g = _groups.get(re);

    return Object.keys(g).reduce(function (groups, name) {
      groups[name] = result[g[name]];
      return groups;
    }, Object.create(null));
  }

  return _wrapRegExp.apply(this, arguments);
}

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
var Code = function Code() {
  _classCallCheck(this, Code);

  _defineProperty(this, "generateCompMap", function () {
    var codeTranslation = {
      '101010': ['0'],
      '111111': ['1'],
      '111010': ['-1'],
      '001100': ['D'],
      '110000': ['A', 'M'],
      '001101': ['!D'],
      '110001': ['!A'],
      '001111': ['-D'],
      '110011': ['-A'],
      '011111': ['D+1', '1+D'],
      '110111': ['A+1', '1+A', 'M+1', '1+M'],
      '001110': ['D-1'],
      '110010': ['A-1', 'M-1'],
      '000010': ['D+A', 'A+D', 'D+M', 'M+D'],
      '010011': ['D-A', 'D-M'],
      '000111': ['A-D', 'M-D'],
      '000000': ['D&A', 'D&M'],
      '010101': ['D|A', 'D|M']
    };
    return Object.keys(codeTranslation).reduce(function (acc, code) {
      var commands = codeTranslation[code];
      commands.forEach(function (c) {
        var aBit = c.includes('M') ? '1' : '0';
        acc[c] = aBit + code;
      });
      return acc;
    }, {});
  });

  _defineProperty(this, "jump", {
    "null": '000',
    JGT: '001',
    JEQ: '010',
    JGE: '011',
    JLT: '100',
    JNE: '101',
    JLE: '110',
    JMP: '111'
  });

  _defineProperty(this, "dest", {
    "null": '000',
    M: '001',
    D: '010',
    MD: '011',
    A: '100',
    AM: '101',
    AD: '110',
    AMD: '111'
  });

  _defineProperty(this, "comp", this.generateCompMap());
};

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
          return '0' + convertDecimalToBinary(parseInt(command.slice(1)));

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

    this.reader = readline.createInterface({
      input: input
    });
    this.inputStream = input;
    this.outputStream = output;
    this.codeTranslator = new Code();
  }

  _createClass(Parser, [{
    key: "parse",
    value: function parse() {
      var outputStream = this.outputStream,
          reader = this.reader,
          generateCodeFromCommand = this.generateCodeFromCommand;
      reader.on('line', function (line) {
        var trimmed = line.trim();

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

var validateFile = function validateFile(file) {
  if (!fs.existsSync(file)) {
    throw new Error("File does not exist: ".concat(file));
  }
};

var assemblyFile = process.argv[2];
validateFile(assemblyFile);
var inputStream = fs.createReadStream(assemblyFile);
var outputStream = fs.createWriteStream('./dist/add.hack');
var parser = new Parser(inputStream, outputStream);
parser.parse();
