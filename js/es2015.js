//es2016的箭头函数语法

var evens = [12, 234, 54, 23, 34];
var odds = evens.map(v => v + 1);
var nums = evens.map((v, i) => v + i);
console.log(odds);
console.log(nums);

var n = [];
nums.forEach(v => {
    if (v % 5 == 0) {
        n.push(v);
    }
});
console.log("被5整除的数：" + n);

//this 词法

var bob = {
    name: "perry",
    age: 23,
    printInfo: function () {
        return () => {
            //修复了es5的语法
            console.log(this.name + "-->" + this.age);//将会指向perry和23
        }
    }
};

bob.printInfo()();


let a = 111;
let b = 222;
var xxx = (c,d) => c*d;
console.log(xxx(a,b));































