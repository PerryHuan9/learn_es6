//生成器函数
//作用：可以完全控制函数的内部状态，可以在中途传入参数，
// 每遇到一个yield点都是返回一个数值并且停止函数的执行，
// 也就是说每一个next都有一个返回值，该返回值为对象，有value和done两个属性
//需要调用next方法才会往下一个yield执行，这时可以为通过next为函数传入参数
//传入的参数在生成器函数内是上一个yield的返回值，所以第一次执行next函数是不应传入参数的
//另外，done属性表示执行状态，true为已经执行到return语句或者执行结束
//必须明确第一次执行函数时返回一个遍历器，该遍历器使用next方法进行下一个

//2、next方法返回过程对象
function* gen(x) {
    let first = yield x;
    let second = yield  first * x;
    let third = yield  second * x;
    return third * x;
}

let g = gen(2);
var a = g.next();

while (!a.done) {
    console.info(a.value + ',' + a.done);
    a = g.next(2);
}
console.info(a.value + ',' + a.done);
//结果:
// 2,false
// 4,false
// 4,true

//2、for of 遍历生成器函数,
function* testFor() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    yield 6;
    yield 7;
    return 8;//8是遍历不到的
}

for (let v of testFor()) {
    console.log(v);
}


//3、yield* 语句
//当需要yield返回的是一个遍历器，则需要子在其后加*号
let c = (function* () {
    yield 'Hello!';
    yield "Boy";
}());


let b = (function* () {
    yield "Hi!";
    yield* c;//如果希望迭代c则需加*号，如不加，返回一个遍历
    yield "Girl";
    yield  [1, 34, 23]//不加*号则返回数组，加就遍历这个数组
}());

for (let f of b) {
    console.log(f);
}


//4、实用，遍历多重数组
var array = [1, 2, 3, 4, [56, 78, [789, 901, [9012]]]];
console.log(array.toString());
function *iterTree(arr) {
    if(Array.isArray(arr)){
        for(let a of arr){
            yield* iterTree(a);
        }
    }else {
        yield arr;
    }
}

for (let b of iterTree(array)){
    console.log(b);
}













