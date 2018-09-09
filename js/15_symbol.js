//利用Symbol值实现Node模块的Singleton模式（单例模式）

const KEY=Symbol();

function A() {
    this.foo="Hello Word !!!";
}

if(!global[KEY]){
    global[KEY]=new A();
}
/**
上面代码将导致其他脚本都无法引用FOO_KEY。但这样也有一个问题，就是如果多次执行这个脚本，
每次得到的FOO_KEY都是不一样的。虽然 Node 会将脚本的执行结果缓存，一般情况下，不会多次执行同一个脚本，
但是用户可以手动清除缓存，所以也不是绝对可靠。
**/
module.exports=global[KEY];
















