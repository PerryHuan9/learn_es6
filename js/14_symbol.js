

//ES6引入了一种新的数据类型Symbol，表示独一无二的值，
//这样可以从根本上防止属性名的冲突

//1、Symbol值有Symbol函数生成
let s=Symbol();
console.log(typeof s);//在这里s是独一无二的值
console.log(s);//Symbol


//为了在控制台对Symbol进行区别，一般对Symbol函数传入一个字符串,
// 无论传入什么类型的值都会转为字符串
let s2=Symbol("baa");
console.log(s2);//Symbol(baa)

//另外Symbol是原始类型，不是对象，所以不能使用new创建
//Symbol类型的值不能和其它类型进行运算
// console.log(s2+"bausdbj");//会报错
// console.log(`asia ${s2}`);//也会报错
 console.log(`asia ${s2.toString()}`);//这样不会报错
//

//但symbol值可以显示转为字符串
console.log(String(Symbol('adadhb')));
console.log(s2.toString());

//另外Symbol值也可以转为布尔值，但不可以转为数值
let sym=Symbol();
console.log(Boolean(sym));//true
console.log(!sym);//取非会自动转为false

if(sym){//自动转为true
    console.log('sym的值为')
    console.log(sym);
}

// Number(sym);//type error
// sym+2 //can'n convert symbol to number


//2、symbol作为对象的属性
let msymbol=Symbol();

//第一种写法
let a={};
a[msymbol]='a:hello';

//第二种方法
let b={
    //在对象内部使用symbol作为属性名必须使用中括号
    [msymbol]:'b:hello'
};

//第三种方法
let c={};
Object.defineProperty(c,msymbol,{value:'c:hello word !'});

//symbol值作为属性名不能使用点运算符，只能使用中括号
//因为点字符后面跟的都是字符串
console.log(a[msymbol]);
console.log(b[msymbol]);
console.log(c[msymbol]);


//symbol作为方法名
let symb=Symbol();

let d={
  [symb]:function () {
      console.log("symbol值z作为属性");
  }
};
d[symb]();

//使用增强对象的写法
let e={
  [symb](){
      console.log("symbol值作为属性名的增强语法");
  }
};
e[symb]();


// 3、Symbol 类型还可以用于定义一组常量，保证这组常量的值都是不相等的。
const log = {};
log.levels = {
    DEBUG: Symbol('debug'),
    INFO: Symbol('info'),
    WARN: Symbol('warn')
};
console.log(log.levels.DEBUG, 'debug message');
console.log(log.levels.INFO, 'info message');


//魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。
//下面使用变量代替case字符串，有利于消除魔术字符串
//并且改变量的值不要求为具体某一个值，只要不相等就行了，这种情况就很适合使用Symbol值
const COLOR_RED    = Symbol();
const COLOR_GREEN  = Symbol();
function getComplement(color) {
    switch (color) {
        case COLOR_RED:
            return COLOR_GREEN;
        case COLOR_GREEN:
            return COLOR_RED;
        default:
            throw new Error('Undefined color');
    }
}


//4、symbol属性名的遍历
//symbol作为属性名，不会出现在for..in for...of循环中
let f=Symbol();
let h=Symbol();
const obj={
    [f]:"Hello",
    [h]:"word",
    name:"do my best",

};
//使用Object.getOwnPropertySymbols方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。
const objSymbol=Object.getOwnPropertySymbols(obj);
console.log(objSymbol);
console.log(obj[objSymbol[0]]);
console.log(obj[objSymbol[1]]);
//使用Object.getOwnPropertyNames方法得不到Symbol属性名,只能得到普通的属性名
const objName=Object.getOwnPropertyNames(obj);
console.log(objName);

//Reflect.ownKeys才能获取获取所有类型的属性名，包括symbol类型
let obj2={
  [Symbol('my_key')]:1,
  enum:2,
  nonenum:3,
};
const allField=Reflect.ownKeys(obj);
console.log(allField);

//由于以 Symbol 值作为名称的属性，不会被常规方法遍历得到。
// 我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。





//5、Symbol.for(),Symbol.keyFor()
//可以通过Symbol.for使用同一个symbol值，它接受一个字符串作为参数
//然后搜索有没有以该参数作为名称的symbol值，如果有则返回该symbol值，
//否则新建一个以该字符串为名称的symbol值并返回
let s3=Symbol.for("foo");
let s4=Symbol.for("foo");
console.log(s3===s4);//true
//注意Symbol()和Symbol.for()的差别
console.log(Symbol("foo")===Symbol("foo"));//false
//Symbol.keyFor()返回的则是已登记的Symbol类型值的key
let a4=Symbol.for('too');
 console.log(Symbol.keyFor(a4));//too


// Symbol.for为 Symbol 值登记的名字，是全局环境的，可以在不同的 iframe 或 service worker 中取到同一个值。
iframe = document.createElement('iframe');
iframe.src = String(window.location);
document.body.appendChild(iframe);
console.log(iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo'));//true
//
// const A=require("./15_symbol.js");
// console.log(A.foo);


//
// 7、内置的Symbol值

//Symbol.hasInstance
class MyClass{
    [Symbol.hasInstance](foo){
        return foo instanceof Array
    }
}
// foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance](foo)。
if([1,2,3] instanceof new MyClass()){
    console.log("是")
}else {
    console.log("否")
}

//另一个例子
// class Even {
//     static [Symbol.hasInstance](obj){
//         return Number(obj)%2===0;
//     }
// }
//等同于
const Even={
    [Symbol.hasInstance](obj){
        return Number(obj)%2===0;
    }
};
console.log(1 instanceof Even);
console.log(2 instanceof Even);




























