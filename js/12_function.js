//目前浏览器不支持尾优化尾递归
//尾调用优化
function f() {
    let n = 1;
    let m = 2;
    return g(n + m);//函数的最后调用一个函数，不能是n+g(n+m)
}

function g(n) {
    return n*n;
}
f();

//尾递归
//计算Fibonacci(斐波那契数列)即第一二项为1，从第三项开始每一项都是前两项的和，1 1 2 3 5 8 13 21 34 55
//该函数是求概该数列的第n项
function fibonacci(n) {
    if(n<=2){
        return 1;
    }
    return fibonacci(n-1)+fibonacci(n-2);
}

console.log(fibonacci(10));//55
// console.log(fibonacci(100));//无法计算内存溢出

//但使用尾递归便不会又内存溢出的问题
'use strict';
function fibonacci2(n,f1=1,f2=1) {
    if(n<=2){
        return f2;
    }
    return fibonacci(n--,f2,f1+f2);
}
console.log(fibonacci2(10));//55
console.log(fibonacci2(100));
