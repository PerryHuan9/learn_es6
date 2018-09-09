//proxy用于修改某些操作的默认行为，等同于在语言层面做出修改，
// 所以属于一种元编程，即对编程语言进行编程

// Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，
// 因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，
// 用在这里表示由它来“代理”某些操作，可以译为“代理器”。

var obj = new Proxy( {} , {
    get(target , key , receiver) {
        console.log( `getting ${key}!` );
        return Reflect.get( target , key , receiver );
    } ,
    set(target , key , value , receiver) {
        console.log( `setting ${key}!` );
        return Reflect.set( target , key , value , receiver );
    }
} );

obj.count = 888;
++obj.count;
console.log( obj.count );


var object = new Proxy( {} , {
    get(target , key) {
        return 888;
    }
} );

console.log( object.size );//888
object.length = 8888;
console.log( object.length );//888

//将proxy直接设置到对象上
var object2 = {
    proxy : new Proxy( {} , {
        get(target , key) {
            return '我好帅';
        }
    } )
};
console.log( object2.proxy.x );

//proxy对象作为其他对象的原型对象
var proxy2 = new Proxy( {} , {
    set(target , key , value , receiver) {
        console.log( `设定${target.toString()}的${key}属性的值为${value},${receiver}` );
        return Reflect.set( target , key , value , receiver );
    }
} );
let o = Object.create( proxy2 );
o.time = 1564;


//同一个拦截器函数设置多个操作
var handler = {
    get(target , name) {
        if (name === 'prototype') {
            return Object.prototype;
        }
        return `Hello ${name}`;
    } ,
    apply(target , thisBinding , args) {
        return args[ 0 ];
    } ,
    construct(target , args) {
        return {value : args[ 1 ]};
    }
};


var fproxy = new Proxy(
    function (x , y) {
        return x + y;
    } ,
    handler
);

console.log( fproxy( 1 , 2 ) );//1
new fproxy( 1 , 2 );//{value:2}
console.log( fproxy.prototype === Object.prototype );
console.log( fproxy.obj );


/***
 proxy支持的拦截操作一共有13种
 1、get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
 2、set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或
 proxy['foo'] = v，返回一个布尔值。
 3、has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
 4、deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
 5、ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、
 Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，
 而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
 6、getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，
 返回属性的描述对象。
 7、defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、
 Object.defineProperties(proxy, propDescs)，返回一个布尔值。
 8、preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
 9、getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
 10、isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
 11、setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。
 如果目标对象是函数，那么还有两种额外操作可以拦截。
 12、apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、
 proxy.call(object, ...args)、proxy.apply(...)。
 13、construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
 **/
//get操作

var persion = {
    name : 'perry'
};
var proxy3 = new Proxy( persion , {
    get(target , key , receiver) {
        if (key in target) {
            return target[ key ];
        } else {
            throw new ReferenceError( 'property ${key} does not exist.' );
        }
    }
} );
console.log( proxy3.name );
// console.log( proxy3.age );

//get实用例程
function createArray(...ele) {
    let handler = {
        get(target , key , receiver) {
            let index = Number( key );
            if (index < 0) {
                key = String( target.length + index );
            }
            return Reflect.get( target , key , receiver );
        }
    };
    return new Proxy( ele , handler );
}

let arr = createArray( '1' , 's' , 23 , 54 , 65 , 76 , 'sd' );
console.log( arr[ -2 ] );
arr.push( "你好啊，帅哥！！" );
console.log( arr[ -1 ] );

//get的第二个例子
const dom = new Proxy( {} , {
    get(target , key , receiver) {
        return function (attrs = {} , ...children) {
            const el = document.createElement( key );
            for (let attr of  Object.keys(attrs) ) {
                el.setAttribute( attr , attrs[ attr ] );
            }
            for (let child of children) {
                if (typeof child === 'string') {
                    child = document.createTextNode( child );
                }
                el.appendChild( child );
            }
            return el;

        }
    }
} );


const el = dom.div( {} ,
    'Hello word!!' ,
    dom.a( {href : '/example.com'} , 'mark' ) ,
    'I like :' ,
    dom.ul( {} ,
        dom.li( {} , 'The web' ) ,
        dom.li( {} , 'Food' ) ,
        dom.li( {} , '...actually that \' it.' )
    )
);

document.body.appendChild(el);

















