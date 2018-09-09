/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.showName = showName;
exports.showAllInfo = showAllInfo;
//创建一个模块并暴露接口

//导出变量
var name = exports.name = 'perry';
var age = exports.age = 22;

var id = "201541314116";
var gender = "man";

exports.id = id;
exports.gender = gender;
//模块内的改变也会影响外面，CommandJS规范则不会

setTimeout(function () {
    return exports.id = id = "201541314116";
}, 5000);

//导出函数和类

function showName() {
    alert(name);
}

function showAge() {
    alert(age);
}

function showId() {
    alert(id);
}

exports.showAge = showAge;
exports.showId = showId;
exports.getId = showId;


//需要注意的是export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系
//报错，不能直接导出数值，要导出接口
// export 1;
//报错，同样输出的还是数值，不是接口
var m = 1;
// export m;
// 对于函数同样也是如此

//另外export命令可以出现在模块的任何地方，只要处于模块顶层就可以，也就是说不能出现在函数或代码块中
// 以下报错
// if(true){
//     export {m};
// }

function showAllInfo() {
    alert("Name:" + name + "\nAge:" + age + "\nId:" + id + "\nGender:" + gender);
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//从前面的例子可以看出，使用import命令的时候，用户需要知道所要加载的变量名或函数名，
// 否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。
//使用ES5提供了export default 为模块指定默认输出，默认输出只能有一个

//1、默认输出匿名函数
// export default function () {
//     console.log("我是默认输出");
// }


//2、用子啊非匿名函数前面也是可以的，此时函数名在外面是无效的
// export default function show() {
//     alert("我在显示");
// }

//3、默认输出函数指针
// function f() {
//     alert("又一种方法");
// }
// export  default f;

//4、默认输出实质上是将输出的函数或变量重命名为default输出
function add(x, y) {
    return x + y;
}
exports.default = add;
// export {add as default};
//等同于export default add;

//由于export default是输出名字为default的变量，
// 所以其后不能接变量声明语句
// export default var a=100;报错
//同样，其后可以接变量值,因为已经指定对外的接口名字为default
// export default 23;

//5、export default 可以和export 语句混用的

var chineseName = exports.chineseName = "黄益凛";
function showChineseName() {
    console.log(chineseName);
}
exports.showChineseName = showChineseName;

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _export_import = __webpack_require__(6);

var my = _interopRequireWildcard(_export_import);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

my.showName();
my.showAllInfo();
my.alertAllInfo();

console.log((0, my.default)(12, 34));

console.log(my.add(10, 23));

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _profile = __webpack_require__(2);

Object.defineProperty(exports, "name", {
  enumerable: true,
  get: function get() {
    return _profile.name;
  }
});
Object.defineProperty(exports, "showName", {
  enumerable: true,
  get: function get() {
    return _profile.showName;
  }
});
Object.defineProperty(exports, "showAllInfo", {
  enumerable: true,
  get: function get() {
    return _profile.showAllInfo;
  }
});
Object.defineProperty(exports, "alertAllInfo", {
  enumerable: true,
  get: function get() {
    return _profile.showAllInfo;
  }
});

var _export_default = __webpack_require__(3);

Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_export_default).default;
  }
});
Object.defineProperty(exports, "add", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_export_default).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ })
/******/ ]);