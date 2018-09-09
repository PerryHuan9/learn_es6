//export default 也可以用来输出类

export default class {
    constructor(name,age,sex){
        this.name=name;
        this.sex=sex;
        this.age=age;
    }

    showInfo(){
        console.log(`Name:${this.name}\nAge"${this.age}\nSex:${this.sex}`);
    }
}
