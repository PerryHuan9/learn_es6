/**
 * Reflect的设计初衷也是为了操作对象，其有以下设计目的
 *  （1）将Object上一些属于语言内部的方法放在Reflect上，如Object.defineProperty()
 *  （2）修改某些Object方法的返回结果，如Object.defineProperty()在无法定义属性时会报错，而Reflect上只会返回false
 *  （3）让Object操作变成函数行为，如'field' in obj 变成Reflect.has(obj,'field')
 *  （4）Reflect对象的方法与proxy对象的方法一一对应，proxy是拦截修改默认行为，而Reflect是设置默认行为
 *
 *  Reflect对象一共有13个静态方法，分别对应proxy的13种默认行为
 */

//1、Reflect.get(target,name,receiver) 如传入receiver则target中的this是绑定receiver的
let myObj = {
    foo : 1 ,
    bar : 2 ,
    get baz() {
        return this.foo + this.bar;
    } ,
    getBaz() {
        return `this.foo+this.bar`;
    }
};
let receiverObj = {
    foo : 444 ,
    bar : 444 ,
};
let result = Reflect.get( myObj , 'baz' , receiverObj );
console.log( result );//888
//当要获取的属性不存在this，receiver便无效了
result = Reflect.get( myObj , 'foo' , receiverObj );
console.log( result );//1
//将会返回一个function
result = Reflect.get( myObj , 'getBaz' , receiverObj );
console.log( result() );//this.foo+this.bar


//2、Reflect.set(target,name,value,receiver)
let setObj = {
    foo : 666 ,
    set baz(value) {
        return this.foo = value;
    }
};
let receObj = {
    foo : 888
};
Reflect.set( setObj , 'baz' , 555 , receObj );
console.log( setObj.foo , receObj.foo );//666 555

//3、Reflect.has(obj,name)
let hasObj = {
    foo : 999 ,
};
result = Reflect.has( hasObj , 'foo' );
console.log( result );//true


//4、Reflect.deleteProperty(obj,name)
let deleteObj = {
    foo : 888 ,
    bar : 777 ,
    baz : 12123 ,
};
//旧写法
delete deleteObj.foo;
// 新写法
Reflect.deleteProperty( deleteObj , 'bar' );
console.log( deleteObj );


//5、Reflect.construct(target,args)
//提供了一种不使用new来调用构造函数的方法创建实例
class Test {
    constructor(a , b , c) {
        this.a = a;
        this.b = b;
        this.c = c;
        console.log( new.target );
    }

    showABC() {
        console.log( this.a , this.b , this.c );
    }
}

//new写法
let test = new Test( 1 , 2 , 3 );
let test2 = Reflect.construct( Test , [ 4 , 5 , 6 ] );
test2.showABC();


//6、Reflect.getPrototypeOf(obj)
//用于读取对象的__proto__属性,对应于Object.getPrototypeOf()方法
//旧写法
result = Object.getPrototypeOf( test2 );
let result2 = Reflect.getPrototypeOf( test2 );
console.log( result === result2 );


//7、Reflect.setPrototypeOf(obj,newProto)
//用于设置目标对象的原型，相当于Object.setPrototypeOf()
const obj = {};
Reflect.setPrototypeOf( obj , Array.prototype );
obj.push( 1 );
console.log( obj.length );


//9、Reflect.apply(func,thisArg,args)
//等同于Function.prototype.apply.call(func,thisArg,args)
//用于绑定this对象后执行给定函数
//旧用法
const args = [ 12 , 34 , 563 , 23 , 2 , 4 , 556 , 43 ];
let young = Math.min.apply( Math , args );
let old = Math.max.call( Math , ...args );
let type = Object.prototype.toString.call( young );
console.log( young , old , type );
//新写法
young = Reflect.apply( Math.min , Math , args );
old = Reflect.apply( Math.max , Math , args );
type = Reflect.apply( Object.prototype.toString , young , [] );//Number
console.log( young , old , type );


//10、Reflect.defineProperty(target,propertykey,attributes)
//用来为对象定义属性，等价于Object.defineProperty()
let MyDate = {};
Object.defineProperty( MyDate , 'now' , {
    value : _ => Date.now()
} );
//新写法
Reflect.defineProperty( MyDate , 'value' , {
    value : Date.now()
} );
let md = MyDate;
console.log( md.now() , md.value );


//11、Reflect.getOwnPropertyDescriptor(target,propertyKey)
//等同于Object.getWonPropertyDescriptor(  )
let mo = {};
Reflect.defineProperty( mo , 'name' , {
    value : 'hello' ,
    enumerable : false ,
} );
let oldM = Object.getOwnPropertyDescriptor( mo , 'name' );
let newM = Reflect.getOwnPropertyDescriptor( mo , 'name' );
console.log( oldM , newM );


//12、Reflect.isExtensible(target)
//对应Object.isExtensible() 返回一个布尔值，表示当前对象是否可以扩展
let o = {};
result = Object.isExtensible( o );
console.log( result );//true
o = Object.freeze( {} );
result = Reflect.isExtensible( o )
console.log( result );//false


//13、Reflect.ownKeys(target)
//相当于Object.getOwnPropertyNames()和Object.getOwnPropertySymbols()之和
//用于返回对象的所有属性
let mobj = {
    foo : 1 ,
    bar : 3 ,
    [ Symbol.for( 'baz' ) ] : 4 ,
    [ Symbol.for( 'foo2' ) ] : 888 ,
};
//旧写法
result = Object.getOwnPropertyNames( mobj );
console.log( result );
result = Object.getOwnPropertySymbols( mobj );
console.log( result );
//新写法
result = Reflect.ownKeys( mobj );
console.log( result );


/**
 *
 * 使用proxy实现观察者模式
 *
 */
const fnSet=new Set();
function observe(fn) {
    fnSet.add(fn);
}
function observable(obj) {
    return new Proxy(obj,{
        set(target,key,value,receiver){
            const result=Reflect.set(target,key,value,receiver);
            fnSet.forEach(item=>item());
            return result;
        }
    })
}
let obje={
    name:"perry",
    age:22,
};
function print() {
    for(let f of Reflect.ownKeys(obje)){
        console.log(f,':',obje[f]);
    }
}

obje=observable(obje);
observe(print);
obje.sex='man';
obje.name='黄益凛';








































