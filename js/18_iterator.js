//测试Iterator接口


function makeIterator(array){
    let index = 0;
    return {
        next(){
            if(index < array.length){
                return {
                    value : array[ index++ ] ,
                    done : false ,
                }
            }else{
                return {
                    value : undefined ,
                    done : true

                }
            }
        }
    }
}

const it = makeIterator([ 8 , 3 , 4 , '你好' ]);
let obj;
while(!(obj = it.next()).done){
    console.log(obj.value);
}

//上述函数可以简写
function makeIterator2(array){
    let index = 0;
    return {
        next(){
            return index < array.length ? {value : array[ index++ ]} : {done : true};
        }
    }
}

const it2 = makeIterator2([ 8 , 3 , 4 , '你好' ]);
let obj2;
while(!(obj2 = it2.next()).done){
    console.log(obj2.value);
}

//凡是具有Symbol.iterator属性的数据结构都可认为是‘可遍历的’,并且在该方法上部署遍历器生成方法，
// 就可以使用for of循环调用返回遍历器
//原生具备Iterator接口的数据结构有
// Array，Map,Set,String,TypedArray,函数的arguments和NodeList对象
let arr = [ 'a' , 'b' , 'c' , 'd' ];
let it3 = arr[ Symbol.iterator ]();
let a;
while(!(a = it3.next()).done){
    console.log(a.value);
}

//例1
class RangeIterator{
    constructor(start , stop){
        this.start = start;
        this.stop = stop;
    }

    [ Symbol.iterator ](){
        return this;
    }

    next(){
        if(this.start < this.stop){
            return {
                value : this.start++
            }
        }
        return {done : true};
    }
}

function range(a , b){
    return new RangeIterator(a , b);
}

for(let value of range(0 , 8)){
    console.log(value);
}


//例2 改变指针
function Obj(value){
    this.value = value;
    this.next = null;
}

Obj.prototype[ Symbol.iterator ] = function(){
    let current = this;
    return {
        next(){
            if(current){
                let value = current.value;
                current = current.next;
                return {
                    value
                }
            }
            return {done : true};
        }
    }
};

let o1 = new Obj('第一个');
let o2 = new Obj('第二个');
let o3 = new Obj('last one');
o1.next = o2;
o2.next = o3;

for(let a of o1){
    console.log(a);
}

//对于类数组对象，可以直接使用数组的Symbol.iterator
NodeList.prototype[ Symbol.iterator ] = Array.prototype[ Symbol.iterator ];
//或者
// NodeList.prototype[Symbol.iterator]=[][Symbol.iterator];
const nl = [ ...document.querySelectorAll('div') ];//可以直接使用，不会报错
console.log(nl);

//例3 在类数组对象中使用数组的iterator
let myarray = {
    0 : 'first one' ,
    1 : 'second one' ,
    2 : 'last one' ,
    length : 3 ,
    [ Symbol.iterator ] : [][ Symbol.iterator ] ,
};
for(let e of myarray){
    console.log(e);
}
//对非类数组对象则无法正常使用数组的迭代器

//调用iterator接口的场合
//1、解构赋值 对数组和set结构解构赋值时，实际上调用了数组的iterator
const array = [ 1 , 2 , 43 , 5 , 6 ];
const [ first , ...rest ] = array;
console.log(first);//1
console.log(rest);//[2,43,5,6]

//2、扩展运算符
let word = 'hello word';
console.log('word:' , [ ...word ]);
let arr2 = [ 'arrat frist' , 'array second' ];
console.log('second:' , [ 1 , ...arr2 , 888 ]);

//3、yield*
//yield* 后面会跟一个可遍历的结构，它会调用该结构的iterator接口
function* generator(){
    yield 1;
    yield 'second';
    yield* [ 1 , 5 , 6 , 7 ];
    yield '结束吧';
};
const iter = generator();
console.log('a' , iter.next());
for(let a of generator()){
    console.log(a);
}

//4、其它场合
//所有接受数组作为参数的场合，其实都调用了遍历器接口
//-for of
//-Array.from()
//-Map(),Set(),WeakSet(),WeakMap()
//-Promise.all(),
//-Promise.race()


//Symbol,iterator的最简单的实现是使用generator函数
let myiter = {
    * [ Symbol.iterator ](){
        yield 1;
        yield 'middle';
        yield 'finally';
    }
};
console.log([...myiter]);


//6遍历器的return方法
//在for of循环提前退出（调用break或出错），就会调用return方法
let abc={
    array:[1,2,4,6,7],
    [Symbol.iterator](){
        let index=0;
        let that=this;
        return{
            next(){
                if(index<that.array.length){
                    return {value:array[index++]}
                }
                return {done:true};
            },
            return(){
                console.log('return方法被调用');
                return{done:true};
            }
        }
    }
};
for(let i of abc){
    console.log(i);
    if(i===2){
        break;
        // throw new Error('你好');
    }
}
















































