// Node是以异步(Async)回调著称的，其异步性提高了程序的执行效率，但同时也减少了程序的可读性。
// 如果我们有几个异步操作，并且后一个操作需要前一个操作返回的数据才能执行，这样按照Node的一般执行规律，
// 要实现有序的异步操作，通常是一层加一层嵌套下去。
//Promise是为了解决多级回调的问题

//其一般形式

new Promise(
    function (resolve, reject) {
        if ("success") {
            //执行代码
            resolve();
        } else {
            //    执行代码
            reject();
        }
    }
);

// 对于Promise对象来说，它也有三种状态：
//  1、pending     初始状态,也称为未定状态，就是初始化Promise时，调用executor执行器函数后的状态。
//在操作成功时，pending会转为fulfilled 操作失败时，pending则转为rejected
//  2、fulfilled   完成状态，意味着异步操作成功。
//  3、rejected    失败状态，意味着异步操作失败。


//Promise.prototype.then()
// then()调用后返回一个Promise对象，意味着实例化后的Promise对象可以进行链式调用，
// 而且这个then()方法可以接收两个函数，分别是处理成功后和处理错误结果的函数。
/**
 1、如果then()方法中返回了一个参数值，那么返回的Promise将会变成接收状态。
 2、如果then()方法中抛出了一个异常，那么返回的Promise将会变成拒绝状态。
 3、如果then()方法调用resolve()方法，那么返回的Promise将会变成接收状态。
 4、如果then()方法调用reject()方法，那么返回的Promise将会变成拒绝状态。
 5、如果then()方法返回了一个未知状态(pending)的Promise新实例，那么返回的新Promise就是未知状态。
 6、如果then()方法没有明确指定的resolve(data)/reject(data)/return data时，
 那么返回的新Promise就是接收状态，可以一层一层地往下传递。
 **/

let promise = new Promise(
    function (resolve, reject) {
        setTimeout(function () {
            resolve('sucess');
        }, 2000)
    }
);
promise.then(
    function (data) {
        console.log(data);//success
    }, function (err) {
        console.log(err);//不执行,上一次调用了resolve
    }
).then(
    function (data) {
        console.log('链式调用：' + data);//上一次没有返回值，所以这里data为undefined
        return new Promise(function (resolve, reject) {
            reject('调用失败');
        });
    }
).then(
    function (data) {
        console.log("继续调用");//不执行，因为上一次调用reject
    }, function (err) {
        console.log(err);
    }
).then(function (data) {
    console.info("重新启程:" + data);
});

// Promise.prototype.catch() 用于捕获错误，一般then的第二个参数不会使用，使用catch取代
let pro = new Promise(
    function (resolve, reject) {
        setTimeout(function () {
            resolve("3  2  1 let's go !!");
        })
    }
);

//使用catch捕获错误后，then便不会再收到错误,如果catch放在最后，
// 而中途又没有then(如果有则进入可以处理错误的then)处理错误，
// 则会直接跳到越过中间所有thencatch，通用形式是一个then配一个catch
pro.then(
    function () {
        throw  new Error("我是异常");
    }
).then(
    function (data) {
        console.info("这一步并不会执行")
    }
).then(
    function (data) {
        console.info("是否会再次执行" + data);
    }, function (err) {
        console.info("错误：" + err);
    }
).then(
    function () {
        console.info("处理错误后，继续执行")
    }
).catch(
    function (err) {
        console.log('捕获错误' + err);
    }
);

//Promise.all()
/**
 Promise.all()接收一个参数，它必须是可以迭代的，比如数组。
 它通常用来处理一些并发的异步操作，即它们的结果互不干扰，但是又需要异步执行。它最终只有两种状态：成功或者失败。
 它的状态受参数内各个值的状态影响，即里面状态全部为fulfilled时，它才会变成fulfilled，否则变成rejected。
 成功调用后返回一个数组，数组的值是有序的，即按照传入参数的数组的值操作后返回的结果。
 **/

var arr = [1, 2, 3, 4];
var promise2 = arr.map(
    function (value) {
        return new Promise(
            function (resolve, reject) {
                if (value === 4) {
                    // throw  new Error("value 为4 的时候出错");
                }
                resolve(value * 5);
            }
        );
    }
);

Promise.all(promise2).then(
    function (data) {
        console.info("Promise.all:" + data);
    }
).catch(
    function (err) {
        console.log("返回的状态不全为fulffilled" + err);
    }
);

/**
 Promise.race()和Promise.all()类似，都接收一个可以迭代的参数，
 但是不同之处是Promise.race()的状态变化不是全部受参数内的状态影响，
 一旦参数内有一个值的状态发生的改变，那么该Promise的状态就是改变的状态。
 就跟race单词的字面意思一样，谁跑的快谁赢。
 */
let p1 = new Promise(
    function (resolve, reject) {
        setTimeout(function () {
            resolve("resolve函数执行快");
        }, 60);
    }
);
let p2 = new Promise(
    function (resolve, reject) {
        setTimeout(function () {
            reject("reject函数执行快");
        }, 50);
    }
);

Promise.race([p1, p2]).then(
    function (data) {
        console.info("Promise.race:" + data);
    }
).catch(
    function (err) {
        console.info("Promise.race:" + err);
    }
);

/**

 Promise.resolve()
 Promise.resolve()接受一个参数值，可以是普通的值，具有then()方法的对象和Promise实例。
 正常情况下，它返回一个Promise对象，状态为fulfilled。
 但是，当解析时发生错误时，返回的Promise对象将会置为rejected态。
 */
//参数为普通的值
let p5=Promise.resolve(5);
p5.then(function (data) {
    console.log("参数为普通的值："+data);
});
//参数为含有then方法的对象
var obj={
    then(){
        console.log('含有then方法的对象');
    }
};
let p6=Promise.resolve(obj);
p6.then(function (data) {
    console.log(data);
});

//参数为Promise实例，但状态为reject
let p7=Promise.reject(7);
let p8=Promise.resolve(p7);
p8.then(function (data) {
    console.log(data);
}).catch(function (err) {
    console.log("错误号："+err);
});

/**
Promise.reject()

Promise.reject()和Promise.resolve()正好相反，它接收一个参数值reason，
 即发生异常的原因。此时返回的Promise对象将会置为rejected态。

**/

let p10=Promise.reject("手动拒绝");
p10.then(function (data) {

}).catch(function (err) {
    console.log(err);
});


// 总之，除非Promise.then()方法内部抛出异常或者是明确置为rejected态，
// 否则它返回的Promise的状态都是fulfilled态，即完成态，并且它的状态不受它的上一级的状态的影响。




// var a=123;
// if(true){
//     a="abc";
//     let a;
// }





