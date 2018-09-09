
//测试for of
//for of语句创建一个循环来迭代可迭代的对象，包括 数组、字符串、映射（Map）和集合(Set)

//1、语法
/**
 for (variable of iterable) {
    statement
}
 variable：每个迭代的属性值被分配给该变量。
 iterable：一个具有可枚举属性并且可以迭代的对象。
 **/

//2、遍历数组
const strs=["mimo","benz","bmw","audi"];
for(let str of strs){
    console.info(str);
}

//3、遍历Map（映射）
const maps=new Map([['one',12],['two',54,18]]);
for(const [key,value] of maps ){
    console.info(`key:${key},value:${value}`);
}
