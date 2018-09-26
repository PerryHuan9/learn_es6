//生成器函数
//作用：可以完全控制函数的内部状态，可以在中途传入参数，
// 每遇到一个yield点都是返回一个数值并且停止函数的执行，
// 也就是说每一个next都有一个返回值，该返回值为对象，有value和done两个属性
//需要再次调用next方法才会往下一个yield执行，这时可以为通过next为函数传入参数
//传入的参数在生成器函数内是上一个yield的返回值，所以第一次执行next函数是不应传入参数的
//另外，done属性表示执行状态，true为已经执行到return语句或者执行结束
//必须明确第一次执行函数时返回一个遍历器，该遍历器使用next方法进行下一个

//2、next方法返回过程对象
function first(){


    function* gen(x){
        let first = yield x;
        let second = yield  first * x;
        let third = yield  second * x;
        return third * x;
    }

    let g = gen(2);//函数并不会执行，直到调用next方法
    var a = g.next();

    while(!a.done){
        console.info(a.value + ',' + a.done);
        a = g.next(2);
    }
    console.info(a.value + ',' + a.done);
//结果:
// 2,false
// 4,false
// 4,true

//2、for of 遍历生成器函数,
    function* testFor(){
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        yield 5;
        yield 6;
        yield 7;
        return 8;//8是遍历不到的
    }

    for(let v of testFor()){
        console.log(v);
    }

//3、yield* 语句
//当需要yield返回的是一个遍历器，则需要子在其后加*号
    let c = (function* (){
        yield 'Hello!';
        yield "Boy";
    }());

    let b = (function* (){
        yield "Hi!";
        yield* c;//如果希望迭代c则需加*号，如不加，返回一个遍历
        yield "Girl";
        yield  [ 1 , 34 , 23 ]//不加*号则返回数组，加就遍历这个数组
    }());
    for(let f of b){
        console.log(f);
    }

//4、实用，遍历多重数组
    var array = [ 1 , 2 , 3 , 4 , [ 56 , 78 , [ 789 , 901 , [ 9012 ] ] ] ];
    console.log(array.toString());

    function* iterTree(arr){
        if(Array.isArray(arr)){
            for(let a of arr){
                yield* iterTree(a);
            }
        }else{
            yield arr;
        }
    }

    for(let b of iterTree(array)){
        console.log(b);
    }
}

// first();

//5、通过yield返回表达式的时候，只有指针指向该语句的时候，表达式才会计算
//另外yield表达式用在另一个表达式，必须放在括号里
//但用做函数参数和在赋值表达式右边的时候，可以不加括号
function second(){

    function f2(a , b){
        return a + b;
    }

    function* f(){
        console.log('first line');
        console.log('second line' , 23 + (yield 888));
        console.log(f2(yield 'a' , yield 'b'));
        const c = yield 25;
        console.log(c);
    }

    const f1 = f();
    let value;
    while(value = f1.next(3).value){
        console.log(value);
    }
}

// second();


//6、如果想第一次调用next方法就可以传入参数，可以在生成器函数外面包裹一层
function third(){
    function wrapper(generator){
        return function(...args){
            const f = generator(...args);
            f.next();
            return f;
        }
    }

    const generator = wrapper(function* (){
        while(true){
            console.log(`you input is:${yield }`);
        }
    })();
    generator.next('第一次输入');
    generator.next('第二次输入');
    generator.next('第三次输入');
}

// third();


//7、利用生成器函数生成斐波那契数列
function fourth(){
    function* fibonacci(){
        let [ pre , cur ] = [ 0 , 1 ];
        for(; ;){
            yield cur;
            [ pre , cur ] = [ cur , pre + cur ]
        }
    }

    for(let ele of fibonacci()){
        if(ele < 1001){
            console.log(ele);
        }else{
            break;
        }
    }

//8、使用生成器函数作为对象的iterator接口
    function* objIterator(obj){
        const keys = Reflect.ownKeys(obj);
        for(const key of keys){
            yield [ key , obj[ key ] ];
        }
    }

    const object = {first : '第一个' , second : '第二个'};
    for(const [ key , value ] of objIterator(object)){
        console.log(`${key}:${value}`);
    }

//或者
    function* objectIterator(){
        //这里如果使用Reflect。ownkeys方法会把symbol类型的键也遍历出来，
        // 即遍历出Symbol.iterator
        const keys = Object.keys(this);
        for(const key of keys){
            yield [ key , this[ key ] ];
        }
    }

    object[ Symbol.iterator ] = objectIterator;
    for(const [ key , value ] of object){
        console.log(`${key}:${value}`);
    }

//9、其它可以使用generator函数返回的iterator作为参数的方法
//除了for...of，还有扩展运算符，解构赋值和Array.from()方法
    function* generator2(){
        yield 'beginning';
        yield 'I want to talk something';
        yield 'I think the success is origin to word hard';
        return 'The end.';//将不会被遍历到
    }

    console.log([ ...generator2() ]);
    let [ start , talk , ...other ] = generator2();
    console.log(start , talk , other);
    console.log(Array.from(generator2()));
}

// fourth();

//10、Generator.prototype.throw()
//该函数可以在生成器函数外抛出错误，然后在生成器函数内接收错误
//需要注意的是在生成器函数内的catch只能捕获一次错误，如果调用了两次
//.throw方法，错误会抛出函数外
function fifth(){

    function* f3(){
        try{
            yield '猪啊你';
        }catch(e){
            console.log('函数内的catch：' , e);
        }
    }

    const d = f3();
    console.log(d.next());
    try{
        d.throw('我抛了一个错误');
        d.throw('我抛了第二个错误');
    }catch(e){
        console.log('函数外的catch：' , e);//将会打印第二个错误
    }


    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

//另外要想内部的catch方法能捕获错误必须先调用一次next方法，
// throw方法在捕获错误后会执行下一条yield，也就是说附带执行一次next方法
    function* f4(){

        try{
            yield console.log('第一次');
            //如果函数外调用了throw方法这一句将不会执行,而是直接进入catch方法
            yield console.log('第二次');
        }catch(e){
            console.log(e);
        }
        try{
            yield console.log('第三次');
            yield console.log('第四次');
        }catch(e){
            console.log('第二个trycatch')
        }

    }

    const h = f4();
    h.next();
    h.throw('我调用了throw方法');
    h.throw('第二个try...catch');
    h.next();


//11、Generator.prototype.return()方法
//return方法可以返回固定的值(需要在return调用之后调用next才会返回该值)并且结束generator函数
//需要注意一点就是，如果生成器函数中存在finally块，那么在执行完finally后才会结束函数
    function* f5(){
        try{
            yield 'con';
            yield 24;
        }catch(e){
            console.log(e);
        }finally{
            yield 66;
            yield 88;
        }
        yield 'end';
    }

    const k = f5();
    console.log(k.next());//value:'con'
    console.log(k.return(888));//value:66  有finally先执行finally，
    console.log(k.next());//value:88 继续执行finally,
    console.log(k.next());//value:888 done:true  finally执行完毕，返回热return的内容
    console.log(k.next());//value:undefined done:true


//12、next(),throw(),return()的共同点
//这三个方法本质上是做同一件事，目的是让Generator函数恢复执行
//next()方法是将yield表达式替换为一个值 let result =yield 12;
//throw()方法是将yield语句替换为一个throw语句，用于将错误抛出
//return()方法是将yield语句替换为一个return语句，用于结束函数

}

fifth();


//13、yield* 表达式
//用来在一个Generator函数里面返回另一个实现了iterator接口的函数
function sixth(){
    function* f6(){
        yield 'f6 first line';
        return 'f6 return line';
    }

    function* f7(){
        yield 'f7 first line';
        //value用于获取f6的return值
        let value = yield* f6();
        yield  value;
        yield  'f7 end line';
    }

    const j = f7();
    for(let i of j){
        console.log(i);
    }

//数组和字符串都有iterator接口，故使用yield调用时会逐一返回单个元素或字符

    function* f8(){
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
        yield 'beginning';
        yield* [ 23 , 43 , 56 ];
        yield* 'hello';
    }

    for(let e of f8()){
        console.log(e);
    }

//使用yield*表达式可以很方便的遍历出嵌套数组的所有成员
    function* iterTree(tree){
        if(Array.isArray(tree)){
            2
            for(const t of tree){
                yield* iterTree(t);
            }
        }else{
            yield tree;
        }
    }

    for(let i of iterTree([ [ 1 , 5 , 6 , [ 6 , 7 , 9 ] , [ 78 , 99 ] ] , 58 ])){
        console.log(i);
    }

//使用yield*遍历完全二叉树
    function Tree(left , label , right){
        this.left = left;
        this.label = label;
        this.right = right;
    }

    function* f9(tree){
        if(!tree) return;
        yield* f9(tree.left);
        yield tree.label;
        yield* f9(tree.right);
    }

    function makeTree(array){
        if(!array || array.length <= 0) return;
        if(array.length === 1) return new Tree(null , array[ 0 ] , null);
        return new Tree(makeTree(array[ 0 ]) , array[ 1 ] , makeTree(array[ 2 ]));
    }

    let tree = makeTree([ [ [ 11 ] , 22 , [ 33 ] ] , 44 , [ [ 55 ] , 77 , [ 66 ] ] ]);
    console.log(tree);
    let result = [];
    for(let a of f9(tree)){
        result.push(a);
        console.log(a);
    }
    console.log(result);
}

// sixth();


//14、Generator函数的this
//Generator函数返回一个遍历器，es6规定这个遍历器是Generator函数的实例，
// 也继承了generator函数的prototype。另外Generator函数只能调用不能new创建，
//其内部的this也不是指向返回的遍历器对象
function seventh(){
    function* f10(){
        this.a = 'adad';
    }

    f10.prototype.hello = function(){
        return 'hi';
    };
    let p = f10();
    console.log(p instanceof f10);//true
    console.log(p.hello());
    console.log(p.a);//undefined 无法调用到a，因为生成器函数内的this并不指向返回的遍历器对象

    //可以通过绑定生成器函数的prototype来解决上述问题
    function* f(a , b , c){
        yield this.a = a;
        yield this.b = b;
        yield this.c = c;
    }

    const gene = f.call(f.prototype , 1 , 2 , 3);
    for(let a of gene){
        console.log(a);
    }
    console.log(gene.a , gene.b , gene.c);

//    如果要使用new创建可以将其改造为构造函数
    function F(a , b , c){
        return f.call(f.prototype , a , b , c);
    }

    let a = new F(66 , 77 , 88);
    for(let c of a){
        console.log(c);
    }
    console.log(a.a , a.b , a.c);

}

// seventh();

//状态机
function eighth(){
    let ticking = true;

    function clock(){
        if(ticking){
            console.log('Tick!');
        }else{
            console.log('Untick!');
        }
        ticking = !ticking;
    }

    clock();
    clock();
//    以上这个函数就是一个状态机，它拥有两种状态，调用一次函数状态就会切换
//    但如果使用generator函数来实现将会变得更简洁，更安全，更符合函数式编程的思想
    function* Clock(){
        while(true){
            console.log('Tick');
            yield;
            console.log('Untick');
            yield;
        }
    }
    const tick = Clock();
    tick.next();
    tick.next();

}

// eighth();

















