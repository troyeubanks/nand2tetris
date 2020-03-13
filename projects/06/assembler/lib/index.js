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
var outputStream = fs.createWriteStream('./dist/add.hack');
var parser = new _parser["default"](inputStream, outputStream);
parser.parse();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJ2YWxpZGF0ZUZpbGUiLCJmaWxlIiwiZnMiLCJleGlzdHNTeW5jIiwiRXJyb3IiLCJhc3NlbWJseUZpbGUiLCJwcm9jZXNzIiwiYXJndiIsImlucHV0U3RyZWFtIiwiY3JlYXRlUmVhZFN0cmVhbSIsIm91dHB1dFN0cmVhbSIsImNyZWF0ZVdyaXRlU3RyZWFtIiwicGFyc2VyIiwiUGFyc2VyIiwicGFyc2UiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7QUFHQTs7Ozs7Ozs7QUFEQTtBQUVBO0FBRUEsSUFBTUEsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQ0MsSUFBRCxFQUF3QjtBQUM1QyxNQUFJLENBQUNDLEVBQUUsQ0FBQ0MsVUFBSCxDQUFjRixJQUFkLENBQUwsRUFBMEI7QUFDekIsVUFBTSxJQUFJRyxLQUFKLGdDQUFrQ0gsSUFBbEMsRUFBTjtBQUNBO0FBQ0QsQ0FKRDs7QUFNQSxJQUFNSSxZQUFZLEdBQUdDLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLENBQWIsQ0FBckI7QUFDQVAsWUFBWSxDQUFDSyxZQUFELENBQVo7QUFFQSxJQUFNRyxXQUFXLEdBQUdOLEVBQUUsQ0FBQ08sZ0JBQUgsQ0FBb0JKLFlBQXBCLENBQXBCO0FBQ0EsSUFBTUssWUFBWSxHQUFHUixFQUFFLENBQUNTLGlCQUFILENBQXFCLGlCQUFyQixDQUFyQjtBQUVBLElBQU1DLE1BQU0sR0FBRyxJQUFJQyxrQkFBSixDQUFXTCxXQUFYLEVBQXdCRSxZQUF4QixDQUFmO0FBRUFFLE1BQU0sQ0FBQ0UsS0FBUCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcblxuLy8gTG9jYWwgaW1wb3J0c1xuaW1wb3J0IFBhcnNlciBmcm9tICcuL3BhcnNlcic7XG4vLyBpbXBvcnQgU3ltYm9sVGFibGUgZnJvbSAnLi9zeW1ib2xUYWJsZSdcblxuY29uc3QgdmFsaWRhdGVGaWxlID0gKGZpbGU6IHN0cmluZyk6IHZvaWQgPT4ge1xuXHRpZiAoIWZzLmV4aXN0c1N5bmMoZmlsZSkpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYEZpbGUgZG9lcyBub3QgZXhpc3Q6ICR7ZmlsZX1gKTtcblx0fVxufTtcblxuY29uc3QgYXNzZW1ibHlGaWxlID0gcHJvY2Vzcy5hcmd2WzJdO1xudmFsaWRhdGVGaWxlKGFzc2VtYmx5RmlsZSk7XG5cbmNvbnN0IGlucHV0U3RyZWFtID0gZnMuY3JlYXRlUmVhZFN0cmVhbShhc3NlbWJseUZpbGUpO1xuY29uc3Qgb3V0cHV0U3RyZWFtID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0oJy4vZGlzdC9hZGQuaGFjaycpO1xuXG5jb25zdCBwYXJzZXIgPSBuZXcgUGFyc2VyKGlucHV0U3RyZWFtLCBvdXRwdXRTdHJlYW0pO1xuXG5wYXJzZXIucGFyc2UoKTtcbiJdfQ==