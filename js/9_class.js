//1、类，一种定义原型的语法糖
class Person {
    constructor(name , gender , age) {
        this.name = name;
        this.gender = gender;
        this.age = age;
    }

    isAdult() {
        return this.age >= 18;
    }
}

let person = new Person( 'perry' , 'man' , 22 );
console.info( person.isAdult() );
console.log( 'class 的类型' , typeof Person );//function
console.log( '类完全可以看成是构造函数的另一种写法：' , Person === Person.prototype.constructor );//true

/**
 * 2、类内部定义的所有方法都是在原型上的，并且这些方法都是不可枚举的
 *    这一点与ES5的不一致,es5写法定义的类原型上的方法是可以枚举的
 *
 */
function Point() {
    this.app = 'app';
    this.toValue = function () {
    }
}

Point.prototype.toString = function () {
};
let point = new Point();
//for in 用来遍历对象的属性
for (let f in point) {
    console.log( 'for in遍历：' , f );//app,toVlue,tostring
}
for (let f of Object.keys( point )) {
    console.log( '通过Object.keys()遍历：' , f );//app tovalue
}
for (let f of Object.getOwnPropertyNames( Point.prototype )) {
    console.log( 'getOPN遍历：' , f );//constructor tostring
}

class Line {
    constructor(length) {
        this.length = length;
    }

    showLine() {
        console.log( 'this is a line' );
    }
}

let line = new Line( 123 );
for (let f in line) {
    console.log( 'line 的属性：' , f );
}
for (let f of Object.keys( Line.prototype )) {
    console.log( 'line的属性 Object：' , f );//无法遍历到showLine方法
}
for (let f of Object.getOwnPropertyNames( Line.prototype )) {
    console.log( 'line的属性get：' , f );//showLine,constructor
}

/**
 * 类的属性名可以采用表达式，模块和类内部默认是严格模式
 */
const methodName = 'getArea';

class Square {
    [ methodName ]() {
        return 8888;
    }
}

let square = new Square();
console.log( square.getArea() );
console.log( square[ methodName ]() );


/**
 * 4、constructor方法，类默认的方法
 * 当使用new创建对象时会调用该方法，默认返回实例对象即this
 * 也可以自己返回一个对象，但此时创建的对象将不是该类的实例
 * 另外，类必须使用new创建，无法直接调用
 */


/**
 * 5、class表达式
 *  与函数一样，类也可以使用表达式的形式定义
 *
 */

//类的名字是MyClass，Me只供内部使用，如内部不用到，可省略
let MyClass = class Me {
    getClassName() {
        return Me.name;
    }
};
let my = new MyClass();
console.log( 'name:' , my.getClassName() );
//写成立即执行函数，直接生成对象
let person2 = new class {
    constructor(name) {
        this.name = name;
    }

    sayName() {
        console.log( this.name );
    }
}( 'perry' );
person2.sayName();


/**
 * 6、类不存在变量提升
 *
 */
//以下报错，类必须定义后才能使用，这种规定与继承有关
// let foo=new Foo();
class Foo {
}

//下列继承不会报错，当类存在变量提升时就会报错，
// 因为Foo类表达式不存在变量提升，所以继承的时候还不存在Foo
//故为了保证继承，不能让类进行变量提升
{
    let Foo = class {
    };

    class Bar extends Foo {
    }
}

/**
 * 7、私有方法和属性
 *   ES6并没有私有方法和属性
 *   但可以进行模拟
 */

//通过命名加以区别，私有属性或方法以下划线开始，但外界还是可以访问到这些方法和属性

class Widget {
    //公有方法
    foo(baz) {
        this._bar( baz );
    }

    //私有方法
    _bar(baz) {
        return this.snaf = baz;
    }
}

let widget = new Widget();
widget.foo( 'abc' );
console.log( widget.snaf );

//将私有方法定义在外部，这样实例便无法访问
class Widget2 {
    foo(baz) {
        bar.call( this , baz );
    }
}

function bar(baz) {
    this.snaf = baz;
}

let widget2 = new Widget2();
widget2.foo( '456' );
console.log( widget2.snaf );

//另一种方法是利用Symbol的唯一性
const sym = Symbol( 'bar' );

class Widget3 {
    // perry = '黄益凛';

    foo(baz) {
        this[ sym ]( baz );
    }


    [ sym ](baz) {
        this.snaf = baz;
    }
}

let widget3 = new Widget3();
widget3.foo( '789456' );
console.log( widget3.snaf );
for (let f of Object.getOwnPropertyNames( Widget3.prototype )) {
    console.log( f );
}

/**
 * 8、new.target属性
 *    返回new命令作用于的那个构造函数，
 *    如果构造函数不是通过new调用，new.target的值为undefined
 */

function Apple(type) {
    //也可以指定为确定的值，即new.target===Apple
    console.log(typeof new.target);
    if(new.target!==undefined){
        this.type=type;
    }else {
        throw new Error('必须使用new命令生成实例');
    }
}
//Apple('fujin)报错
let apple=new Apple('fujin');

//在class类内constructor内使用，当继承时，其值会是子类
// 利用这个特性可以写出不能独立使用，必须继承的类
class Shape{
    constructor(){
        if(new.target==Shape){
            throw  new Error('本类不能被初始化');
        }else {
            console.log("显示的是子类",new.target);
        }

    }
}
class Reactangle extends Shape{
    constructor(length,width){
        super();
    }
}

// let shape=new Shape();//报错
let reat=new Reactangle();



































