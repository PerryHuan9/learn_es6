

//es6中增加了新的数组类型，set和map

//1、Set和WeakSet
//Set（集合）要求元素不能重复，加入重复的元素，只会存在一个

let set=new Set();
set.add(1);
set.add(null);
set.add(1);
set.add(new Date(12343));
set.add(new Date(12343));
set.add(true);
set.add(true);
console.log(set);
for(let s of set){
    console.info(s);
}


//WeakSet则只能加入对象，故基本类型只有转为包装类型才能被加入
let weakSet=new WeakSet();
// weakSet.add(1); error
// weakSet.add("niaho");error
weakSet.add(new Date());
weakSet.add({a:10});
weakSet.add([10]);
weakSet.add(new String("helloweo"));
weakSet.add(new Number(10));
console.log(weakSet);

//Map和WeakMap Map和对象差不多，但对象的属性必须为字符串，而map的的键可为任何值

let map=new Map();
map.set(1,1);
map.set(true,true);
map.set('name','perry');
console.log(map);
console.log(map.get(1));
console.log(map.get(true));

for (let [key,value] of map){
    console.info(`Key:${key},Value:${value}`);
}

//WeakMap要求键必须为对象，

let weakMap=new WeakMap();
weakMap.set({},{a:'a'});
// weakMap.set(1,{}); error
weakMap.set({as:"as"},3);
console.log(weakMap);

//键的引用被删除,对键值不影响
let key={b:'a'},value={c:'c'};
weakMap.set(key,value);
console.log(weakMap);
key=null;
value=null;
console.log(weakMap);
//值的引用被删除，对键值不影响
key={b:'a'},value={c:'c'};
weakMap.set(key,value);
value=null;
console.log(weakMap);







































