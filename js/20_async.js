/**
 * 1、async函数是generator的语法糖,async相当于*，await相当于generator函数的yield，
 * 另外async内置执行器,无需像generator函数那样需要co模块来执行，
 * 还有await语句后面跟着总会是promise，如果不是将会被转为promise，
 * 再有，当所有的await，调用return返回数据时，async函数会返回一个promise
 */

async function f(){
    return 'hello kitty';
}

f().then(v => console.log(v));

//对于函数内错误的处理
async function f1(){
    // throw new Error('你就是一只小小狗');
}

f1().then(v => console.log(v) , e => console.log(e));


async function getTitle(url){
    let response = await fetch(url);
    let html = await response.text();
    return html.match(/<title>([\s\S]+)<\/title>/i)[ 1 ];
}

//then方法只会在函数内的三个操作全部操作完成才会执行
// getTitle('https://tc39.github.io/ecma262/').then(console.log);


/**
 2、只要一个await语句后面的Promise变为reject，那么整个async函数都会中断执行
 如果想不结束函数继续往下执行，可以在函数内直接处理该错误，有两种方法可以处理
 **/
function createPromise(str , bool){
    return new Promise((resolve , reject) =>{
        setTimeout(_ =>{
            if(!bool) resolve(str);
            else reject(str)
        } , 2000);
    });
}

async function f2(){
    let a = await createPromise('第一个await');
    console.log(a);
    //第一种方法直接try..catch处理
    let b;
    try{
        b = await createPromise('错误：第二个await' , true);
    }catch(e){
        console.log('函数内try catch:' , b);
    }
    console.log('error:' , b);
    //第二种方法 promise.catch方法处理
    let d;
    d = await createPromise('错误：第四个await' , true)
        .catch(e =>
            console.log('promise.catch处理错误' , e));
    console.log(d);
    let c = await
        createPromise('第三个await');
    console.log(c);
    return c;
}

// f2().then(d => console.log('结束：' , d) , e => console.log('运行结束：' , e));


/**
 * 3、多个await后面的异步操作如果不存在继发关系，就应该写成同时触发，
 * 这样可以节省很多时间，这个有两种方法
 *  1）可以使用promise.all()将多个异步操作合成一个数组
 *  2）第二种，先执行他们，再一起await他们的结果
 */

async function f4(){
    let start = +new Date();
    let foo = await createPromise('第一个');
    let bar = await createPromise('第二个');
    let stop = +new Date();
    console.log('继发耗时：' , stop - start);
    console.log(foo , bar);
}


async function f3(){
    let start = Date.now();
    let [ foo , bar ] = await Promise.all([ createPromise('你好啊') , createPromise('你谁啊') ]);
    let stop = Date.now();
    console.log('Promise.all方法耗时：' , stop - start);
    console.log(foo , bar);
}


async function f5(){
    let start = Date.now();
    let a = createPromise('第一个');
    let b = createPromise('第二个');
    let bar = await a;
    let foo = await b;
    let stop = Date.now();
    console.log('先执行再await方法：' , stop - start);
    console.log(bar , foo);
}

// f5();
// f4();
// f3();

async function f6(){
    let promises = [ createPromise('first') , createPromise('second' , true) , createPromise('third') ];
    for(let promise of promises){
        try{
            let a = await promise;
            console.log(a);
        }catch(e){

        }
    }
}


f6().then(() => console.log('正常结束') , e => console.log('错误结束'));





