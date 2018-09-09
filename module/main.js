
//声明一句，相同模块无论写了多少次的导入语句，最终只会导入一次
//另外，import语句无论写在哪里都会优先加载，被提升到最前面，但不可将import语句写在非顶层

console.log(name);
console.log(age);
import {name, showAllInfo} from "./profile";
import {age} from "./profile";
import "./profile";//仅执行profile模块，不输入任何值
import {id,gender} from "./profile";
console.log("id:"+id+";gender:"+gender);

import {showAge,showName,showName as getName,getId,showId} from "./profile";

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
import * as profile from "./profile";
// profile.showAllInfo();

//加载默认输出，可以自己随便命名,不需要使用{}，因为只可能有一个默认输出
import {default as _} from "./export_default";
// 相当于 import _ from "./export_default";
console.log(_(34,54));

//同时导入默认方法和其它
import de,{showChineseName} from "./export_default";
console.log(de(12,34));
showChineseName();


//输入默认类
import Persion from "./export_class";
let persion=new Persion("黄益凛",22,"男");
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


























