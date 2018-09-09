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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _profile = __webpack_require__(2);

var profile = _interopRequireWildcard(_profile);

var _export_default = __webpack_require__(3);

var _export_default2 = _interopRequireDefault(_export_default);

var _export_class = __webpack_require__(4);

var _export_class2 = _interopRequireDefault(_export_class);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//声明一句，相同模块无论写了多少次的导入语句，最终只会导入一次
//另外，import语句无论写在哪里都会优先加载，被提升到最前面，但不可将import语句写在非顶层

console.log(_profile.name);
console.log(_profile.age); //仅执行profile模块，不输入任何值

console.log("id:" + _profile.id + ";gender:" + _profile.gender);

//import语句采用的是单例模式
/**
showAge();
showName();
getName();
getId();
showId();
showAllInfo();
**/
//整体加载  必须加as重命名

// profile.showAllInfo();

//加载默认输出，可以自己随便命名,不需要使用{}，因为只可能有一个默认输出

// 相当于 import _ from "./export_default";
console.log((0, _export_default2.default)(34, 54));

//同时导入默认方法和其它

console.log((0, _export_default2.default)(12, 34));
(0, _export_default.showChineseName)();

//输入默认类

var persion = new _export_class2.default("黄益凛", 22, "男");
persion.showInfo();

/**

上面代码中，引擎处理import语句是在编译时，这时不会去分析或执行if语句，
 所以import语句放在if代码块之中毫无意义，因此会报句法错误，而不是执行时错误。
 也就是说，import和export命令只能在模块的顶层，
 不能在代码块之中（比如，在if代码块之中，或在函数之中）。

这样的设计，固然有利于编译器提高效率，但也导致无法在运行时加载模块。
 在语法上，条件加载就不可能实现。如果import命令要取代 Node 的require方法，
 这就形成了一个障碍。因为require是运行时加载模块，import命令无法取代require的动态加载功能。
上面的语句就是动态加载，require到底加载哪一个模块，只有运行时才知道。import命令做不到这一点。

因此，有一个提案，建议引入import()函数，完成动态加载。
 import()返回一个 Promise 对象。
**/

/***/ }),
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//export default 也可以用来输出类

var _class = function () {
    function _class(name, age, sex) {
        _classCallCheck(this, _class);

        this.name = name;
        this.sex = sex;
        this.age = age;
    }

    _createClass(_class, [{
        key: "showInfo",
        value: function showInfo() {
            console.log("Name:" + this.name + "\nAge\"" + this.age + "\nSex:" + this.sex);
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ })
/******/ ]);