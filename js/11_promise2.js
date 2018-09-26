//1、异步加载图片
function loadImg(url){
    return new Promise(function(resolve , reject){
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = _ => reject('加载失败');
        image.src = url;
    });
}

loadImg('assets/img/panda.jpg').then(function(img){
    document.body.appendChild(img)
    console.log('加载成功')
} , function(err){
    console.log(err);
});


//2、用promise实现Ajax操作
function getJson(url){
    return new Promise(function(resolve , reject){
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(this.readyState !== 4){
                return;
            }
            if(this.status >= 200){
                resolve(this.response);
            }else{
                reject(new Error(this.responseText));
            }
        };
        xhr.open('get' , url , true);
        xhr.send(null);
    })
}

getJson('https://www.easy-mock.com/mock/5b7e22258f158714cc85d0e1/example/user/photo')
    .then(function(response){
        console.log(response);
    })
    .catch(function(err){
        console.log(err);
    });


//3、resolve带有参数时，会将参数传给回调函数，也可以传回一个promise
//当传回promise对象时，当前promise的状态取决于传入的promise的状态
//调用resolve和reject后并不会终结promise函数的执行，之后的语句还是会执行的
const p2 = new Promise(function(resolve , reject){
    resolve(
        new Promise(function(resolve , reject){
            setTimeout(function(tag){
                //这里promise的状态为fulfilled，所以p2的状态也为fulfilled
                //如果这里调用reject，那么p2的状态也为reject
                resolve(tag);
                // reject(tag);
            } , 2000 , 'success')
        })
    )
});
p2.then(function(value){
    console.log(value);
} , function(err){
    console.log(new Error(err));
});


//Promise.all([])，传入一个promise数组，如果为非数组将会使用Promise.resolve()转化
//只有当数组内的所有Promise的状态变为fulfilled，或者有一个promise的状态变为reject
//则会回调Promise.all()方法的回调函数,另外如果传入的promise已经存在catch函数，
//那么其给Promise的状态是fulfilled

//事实上这里的p1的状态将会是fulfilled
const p1 = new Promise(
    (resolve , reject) =>{
        reject('抛错');
    }
).catch(err => err);//catch返回的是一个fulfilled状态的promise

const p3 = new Promise(resolve => resolve('成功'));
Promise.all([ p1 , p3 ])
    .then(value => console.log('成功：' , value))
    .catch(err => console.log("失败:" , err));


//Promise.race() 当传入的promise其中一个状态改变，其状态改变
const p4 = new Promise(
    (resolve , reject) =>
        setTimeout(
            () => resolve('abc') ,
            2000
        )
);
Promise.race([ p1 , p4 ])
    .then(
        value => console.log('ok:' , value)
    ).catch(
        err=>console.log('err:',err)
);

































