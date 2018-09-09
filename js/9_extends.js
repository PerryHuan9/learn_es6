/**
 * 1、继承
 *    子类构造函数必须先调用构造函数，因为子类实例的构建依赖父类实例
 *    不调用super方法也就不能使用this
 *    静态方法也可以实现继承
 *
 *
 */

class Person {
    constructor(name , gender , age) {
        this.name = name;
        this.gender = gender;
        this.age = age;
    }

    isAdult() {
        return this.age >= 18;
    }

    static sayHello() {
        alert( 'hello' );
    }
}

//类的继承
class Adult extends Person {
    constructor(name , sex , age , id) {
        super( name , sex , age );
        this.id = id;

    }

    showInfo() {
        document.write( `
        Name:${this.name}<br>
        Age:${this.age}<br>
        Gender:${this.gender}<br>
        Id:${this.id}<br>
        ` );
    }

    // get或set,设定了set/get方法后才能直接访问属性,命名不能和属性一致
    get myname() {
        return this.name;
    }

    set myname(name) {
        this.name = name;
    }

//    静态方法
    static isAdultClass(obj) {
        return obj instanceof Adult;
    }
}

let adult = new Adult( 'perry' , 'man' , 23 , '440811199602180332' );
adult.showInfo();
console.log( adult.isAdult() );
console.log( adult.myname );
adult.myname = "woman";
console.log( adult.myname );
adult.showInfo();
console.info( Adult.isAdultClass( adult ) );
// Adult.sayHello();

/**
 * 2、Object.getPrototypeOf()从子类上获取父类
 *
 */
if (Object.getPrototypeOf( Adult ) === Person) {
    console.log( 'Adult继承自Person' );
}


/**
 *
 * 3、super
 *    super在子类上既可以当作函数使用，也可以当作对象使用
 *    当其为函数时，代表父类的构造函数，只能位于子构造函数中
 *    但其作为对象时，在普通方法中指向父类原型对象，在静态方法中指向父类
 *
 */
class A {
    constructor() {
        this.name = 'perry';
        console.log( 'new.target:' , new.target );
    }

    printName() {
        console.log( 'name:' , this.name );
    }

    static done() {
        console.log( 'do:' , this.doing );
    }
}

A.doing = 'Hello Word';

// A.prototype.name='perry huang';
class B extends A {
    constructor() {
        //必须先调用super，并且这里super是作为函数使用
        super();
        this.name = '黄益凛';
        //如果通过super为某一个属性赋值，此时的super将相当于this
        super.name = '威风凛凛';
        //下面的super指向父类原型对象
        console.log( 'super.name:' , super.name );//undefined
        console.log( 'this.name' , this.name );//威风凛凛
    }

    printChineseName() {
        //这里的super指向父类原型对象
        //并且相当于super.printName.call(this)，该方法内的this指向子类
        super.printName();//黄益凛
    }

    static myDone() {
        super.done();
    }
}

B.doing = '再见';
let b = new B();
b.printChineseName();
B.myDone();


/**
 * 4、prototype和__proto__属性,ES6中存在两条继承链
 *    (1)子类的__proto__属性，表示构造函数的继承，总是指向父类
 *   （2）子类的prototype属性的__proto__属性，表示方法的继承，总是指向父类的protype属性
 */
class C {
}

class D extends C {
}

console.log( D.__proto__ === C );//true
console.log( D.prototype.__proto__ === C.prototype );//true


/**
 *
 * 5、继承原生构造函数
 *   ES中原生构造函数有Boolean,Number,String,Array,Date,Function,RegExp,Error,Object
 *   在Es5中无法继承这些原生构造函数，因为使用call或apply调用时，原生构造函数会自动忽略传入的对象
 *   在ES6中时允许继承原生构造函数的，主要是因为ES6中的继承时先建父类的this，在用子类的构造函数修饰this
 *    但需要注意的是继承Object时有一个行为差异，无法通过super传参数，这是因为ES6规定如果不是通过new创建对象，
 *    那么忽略参数
 *
 */

class MyArray extends Array {
    constructor(...args) {
        super( ...args );
    }
}

var arr = new MyArray();
arr[ 0 ] = 12;
console.log( arr.length ); // 1

arr.length = 0;
console.log( arr[ 0 ] );// undefined

/**
 *
 * 6、Mixin模式的实现
 *      指多个对象合成一个对象
 */

//简单实现
const a = {
    a : 'a'
};
const b = {
    b : 'b'
};
const c = {...a , ...b}; // {a: 'a', b: 'b'}

//更完备的实现
function mix(...mixins) {
    class Mix {
    }

    for (let mixin of mixins) {
        copyProperties( Mix.prototype , mixin ); // 拷贝实例属性
        copyProperties( Mix.prototype , Reflect.getPrototypeOf( mixin ) ); // 拷贝原型属性
    }

    return Mix;
}

function copyProperties(target , source) {
    for (let key of Reflect.ownKeys( source )) {
        if (key !== "constructor"
            && key !== "prototype"
            && key !== "name"
        ) {
            let desc = Object.getOwnPropertyDescriptor( source , key );
            Object.defineProperty( target , key , desc );
        }
    }
}


