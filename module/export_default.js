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
export default add;
// export {add as default};
//等同于export default add;

//由于export default是输出名字为default的变量，
// 所以其后不能接变量声明语句
// export default var a=100;报错
//同样，其后可以接变量值,因为已经指定对外的接口名字为default
// export default 23;

//5、export default 可以和export 语句混用的
export var chineseName="黄益凛";
function showChineseName() {
    console.log(chineseName);
}
export {
    showChineseName
}
































