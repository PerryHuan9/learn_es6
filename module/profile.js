//创建一个模块并暴露接口

//导出变量
export var name = 'perry';
export let age = 22;

let id = "201541314116";
let gender = "man";

export {id, gender};
//模块内的改变也会影响外面，CommandJS规范则不会
setTimeout(() => id = "201541314116", 5000);

//导出函数和类

export function showName() {
    alert(name);
}

function showAge() {
    alert(age);
}

function showId() {
    alert(id);
}

export {
    showAge,
    showId,
    showId as getId,//使用as为该模块重命名，只要对原名也进行导出，那么导入时可以使用原名和重命名后的名字导入
}

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

export function showAllInfo() {
    alert(`Name:${name}\nAge:${age}\nId:${id}\nGender:${gender}`);
}














































