"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var fs = _interopRequireWildcard(require("fs"));

var _parser = _interopRequireDefault(require("./parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Local imports
// import SymbolTable from './symbolTable'
var validateFile = function validateFile(file) {
  if (!fs.existsSync(file)) {
    throw new Error("File does not exist: ".concat(file));
  }
};

var assemblyFile = process.argv[2];
validateFile(assemblyFile);
var inputStream = fs.createReadStream(assemblyFile);
var outputStream = fs.createWriteStream('./dist/test.txt');
var parser = new _parser["default"](inputStream, outputStream);
parser.parse();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJ2YWxpZGF0ZUZpbGUiLCJmaWxlIiwiZnMiLCJleGlzdHNTeW5jIiwiRXJyb3IiLCJhc3NlbWJseUZpbGUiLCJwcm9jZXNzIiwiYXJndiIsImlucHV0U3RyZWFtIiwiY3JlYXRlUmVhZFN0cmVhbSIsIm91dHB1dFN0cmVhbSIsImNyZWF0ZVdyaXRlU3RyZWFtIiwicGFyc2VyIiwiUGFyc2VyIiwicGFyc2UiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7QUFJQTs7Ozs7Ozs7QUFEQTtBQUVBO0FBRUEsSUFBTUEsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQ0MsSUFBRCxFQUF3QjtBQUM1QyxNQUFJLENBQUNDLEVBQUUsQ0FBQ0MsVUFBSCxDQUFjRixJQUFkLENBQUwsRUFBMEI7QUFDekIsVUFBTSxJQUFJRyxLQUFKLGdDQUFrQ0gsSUFBbEMsRUFBTjtBQUNBO0FBQ0QsQ0FKRDs7QUFNQSxJQUFNSSxZQUFZLEdBQUdDLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLENBQWIsQ0FBckI7QUFDQVAsWUFBWSxDQUFDSyxZQUFELENBQVo7QUFFQSxJQUFNRyxXQUFXLEdBQUdOLEVBQUUsQ0FBQ08sZ0JBQUgsQ0FBb0JKLFlBQXBCLENBQXBCO0FBQ0EsSUFBTUssWUFBWSxHQUFHUixFQUFFLENBQUNTLGlCQUFILENBQXFCLGlCQUFyQixDQUFyQjtBQUVBLElBQU1DLE1BQU0sR0FBRyxJQUFJQyxrQkFBSixDQUFXTCxXQUFYLEVBQXdCRSxZQUF4QixDQUFmO0FBRUFFLE1BQU0sQ0FBQ0UsS0FBUCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCBjaGlsZF9wcm9jZXNzIGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuXG4vLyBMb2NhbCBpbXBvcnRzXG5pbXBvcnQgUGFyc2VyIGZyb20gJy4vcGFyc2VyJztcbi8vIGltcG9ydCBTeW1ib2xUYWJsZSBmcm9tICcuL3N5bWJvbFRhYmxlJ1xuXG5jb25zdCB2YWxpZGF0ZUZpbGUgPSAoZmlsZTogc3RyaW5nKTogdm9pZCA9PiB7XG5cdGlmICghZnMuZXhpc3RzU3luYyhmaWxlKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcihgRmlsZSBkb2VzIG5vdCBleGlzdDogJHtmaWxlfWApO1xuXHR9XG59O1xuXG5jb25zdCBhc3NlbWJseUZpbGUgPSBwcm9jZXNzLmFyZ3ZbMl07XG52YWxpZGF0ZUZpbGUoYXNzZW1ibHlGaWxlKTtcblxuY29uc3QgaW5wdXRTdHJlYW0gPSBmcy5jcmVhdGVSZWFkU3RyZWFtKGFzc2VtYmx5RmlsZSk7XG5jb25zdCBvdXRwdXRTdHJlYW0gPSBmcy5jcmVhdGVXcml0ZVN0cmVhbSgnLi9kaXN0L3Rlc3QudHh0Jyk7XG5cbmNvbnN0IHBhcnNlciA9IG5ldyBQYXJzZXIoaW5wdXRTdHJlYW0sIG91dHB1dFN0cmVhbSk7XG5cbnBhcnNlci5wYXJzZSgpO1xuIl19