//1、对象字面量扩展语法
let obj = {
    name: 'ximon',
    age: 22,
    print: function () {
        console.info(`Name: ${this.name} , Age: ${this.age}`);
    },
    //对象字面量方法的es6表示
    printName() {
        console.info(`Name: ${this.name}`);
    }
};

obj.print();
obj.printName();

// 2、支持__proto__注入,可以强制使用__proto__将一个对象变为一个类的实例
class Apple {
    constructor(color, weight) {
        this.color = color;
        this.weight = weight;
    }

    changeColor(color) {
        this.color = color;
        console.info(this.color);
    }

    beAte(people) {
        console.info(`This ${this.color} Apple is ate by ${people} .`);
    }
}

let newClass = {
    __proto__: new Apple('red', 10),
    play() {
        console.info("I play the football");
    }
};

newClass.changeColor("blue");
newClass.beAte("perry");
newClass.play();


//3、对象简写属性名的语法糖
let demo = {};

function get(key) {
    return demo[key] ? demo[key] : null;
}

function set(key, value) {
    demo[key] = value;
}

function clear() {
    demo = {};
}

// //commonJS规范，模块输出
// module.exports={
//     get:get,
//     set:set,
//     clear:clear
// };
// //es6简写方法
// module.exports={
//     get,set,clear
// };


function f(x, y) {
    return {x, y};
}

//等同于
function f2(x, y) {
    return {x: x, y: y};
}

let e = f(2, 4);
let e2 = f2(2, 4);
console.info(e);
console.info(e2);


//4、可以动态计算的属性名称
let arr=[1,2,3];

let newArr=arr.map(v=>{
    return {
        [v]:v,
        [`${v}^2`]:Math.pow(v,2)
    }
});

console.log(newArr);








































