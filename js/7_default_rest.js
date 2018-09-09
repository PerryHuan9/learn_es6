//默认参数和后续参数

//1、默认参数
//在es5中默认参数只能如下设定
function  play(game) {
    game=game||'pingpong';
    console.log(`I play ${game}`);
}
//在ES6中可以这样
function play2(game='pingpong') {
    console.log(`I play ${game}`);
}

play();
play2();

//2、后续函数
//多余的参数可以使用..name来表示

function f(a, ...arg) {

}

//其效果和arguments类似，但在使用箭头函数的时候，其arguments会随上下文绑定到上层，
//所以在不确定上下文的时候，使用...arg更好，另外省略参数只能放在最后一个参数的位置






















