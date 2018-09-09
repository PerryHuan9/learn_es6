//测试箭头函数和this词法

//1、箭头函数
var evens = [12, 23, 34, 54, 65, 67];
var odds = evens.map(v => v + 1);
var nums = evens.map((v, i) => v + i);
var filter = [];
evens.forEach(v => {
    if (v % 5 == 0) {
        filter.push(v);
    }
});

console.info(evens);
console.info(odds);
console.info(nums);
console.info(filter);


//2、this词法
//在箭头函数中的this始终指向这个函数

var bob = {
    name: 'perry',
    age: 20,
    printInfo() {
        return () => {
            console.info('name:' + this.name + ",age:" + this.age);
        }
    }
};
//箭头函数的this绑定所在的上下文（无法使用apply和call修改），而不是当前的执行环境，
bob.printInfo()();//结果是perry和20,//非箭头函数时是undefine

//3、共享arguments类数组对象
function square() {
    let example = () => {
        let numbers = [];
        for (let number of arguments) {
            numbers.push(number * number);
        }
        return numbers;
    };
    return example;
}

console.log(square(2, 4, 5, 56, 34, 3, 2)());


let my = {
    msg: "American is destryed",
    print: () => {
        return this.msg;
    }

};

let a = {
    msg: "perry",
    other: my.print
}

console.log(my.print());
var msg = "adnjka";
console.log(my.print());

//正常的方法
function sortBumbers() {
    return Array.prototype.slice.call(arguments).sort(function (v1, v2) {
        return v1 - v2
    });
}

//es6的方法
function sortNumbers(...values) {
    return values.sort(function (v1, v2) {
        return v1 - v2;
    });
}

console.log("排序：" + sortBumbers(10, 12, 25, 4, 5, 67, 87234, 34));
console.log("排序2：" + sortNumbers(10, 34, 121, 23, 43, 2, 344, 54, 56));













































