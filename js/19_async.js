//测试异步操作
const fetch = require('node-fetch');


function* gen(){
    let url = 'https://www.easy-mock.com/mock/5b7e22258f158714cc85d0e1/example/map';
    let result = yield fetch(url);
    console.log('接收到数据');
    console.log(result);
}


export default function(){
    console.log('beginning');
    let g = gen();
    let result = g.next();
    result.value
        .then(data => data.json())
        .catch(e => console.log(e))
        .then(data => g.next(data));
}
















