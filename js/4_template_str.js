//测试es6模板字符串
//es6使用·来代替单引号和双引号，
//1、支持变量引入

let name="perry";
let age=24;

let greet=`Hi,I'm ${name},my age is ${age}`;
console.info(greet);

//支持换行
let str=`
    <div>
        <h3>我就会标题</h3>
        <p>我不是正文吗？</p>
    </div> 

`;
document.write(str);


//模板字符串还能嵌套 支持变量插入
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;
document.write(tmpl([{first:'你好',last:"你是谁"},{first:"我爱你",last:888}]));




//当向函数传入模板字符串参数，有一些变化
let a=10,b=888;
alert(`Hello ${ a + b } world ${ a * b }`);//Hello 898 word 8880
//对于alert函数， 其内部经过了还原所以显示成这样，但对于自定义函数数，就不一样了
console.log(tag`Hello ${ a + b } world ${ a * b }`);//['hello','word','']
// 等同于
console.log(tag(['Hello ', ' world ', ''], 15, 50));//即变量部分会拆解出来
function tag(str) {
    console.log(str);
}

console.log(tag2(`Hello ${ a + b } world ${ a * b }`));

//内部进行还原
function tag2(arr) {
    let result="";
    let i=0;
    while (i<arr.length) {
        result+=arr[i++];
        if(i<arguments.length){
            result+=arguments[i];
        }
    }
    return result;
}


let a3=0.15;
let b3=0.15;
if(a3+b3===0.3) {
    alert("相等");
}else {
    alert("不相等");
}












