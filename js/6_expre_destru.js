//对象字面量表达式扩展
let cat="猫咪",dog="旺财";
let animal={
    cat,dog
};
console.log(animal);

//1、对象结构赋值
let obj={
    type:"cat",
    size:10
};
//对象内的变量必须与obj的属性一致，否则得到undefined
let {type,size}=obj;
let {t,s}=obj;
console.log(`type:${type},size:${size}`);// cat 10
console.log(`t:${t},s:${s}`);//undefined undefined

let {type:a}=obj;
console.log("a:"+a+";type:"+type);


//2、数组的结构赋值，只要数组右边是iterator对象，便可以结构赋值
let [d,b,c]=[1,3,4];
console.log(d+':'+b+":"+c);

function* f() {
    let a=0;
    let b=1;
    while(true){
        yield a;
        [a,b]=[b,a+b];
    }
}

let [first,second,third]=f();
console.log("结构generator函数:"+third+first+second);


//3、字符串的结构赋值 字符串首先会别转换为一个类似数组的对象
const [a1,b1,c1,d1,e1]="hello";
console.log("对象的解构赋值："+a1+b1);
let{length:len}='hello';
console.log("length："+len);

//4、数值和布尔值的结构赋值
//等号右边如果是数值和布尔值，将先转为对象
let {toString:a2}=123;
console.log(a2===Number.prototype.toString);//true
let {toString:a3}=true;
console.log(a3===Boolean.prototype.toString)//true

//函数参数的解构赋值
function add([a,b]) {
    return a+b;
}
console.log("函数参数的解构赋值："+add([1,2]));//3
[[1,2],[3,4]].map(([a,b])=>a+b);//[3,7]3














































