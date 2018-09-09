//export和import配合使用
export { name , showName } from "./profile"
/**
 //相当于
 import { name , showAllInfo } from "./profile";

 export { name , showAllInfo }
 //但有一个区别export {name,showAllInfo} from "./profile"实际上并没有导入
 //profile模块。只是对外转发了它的两个接口

 **/
export { showAllInfo }from "./profile"
//转发接口改名
export { showAllInfo as alertAllInfo } from "./profile";
//整体输出
// export * from "./profile";

//默认接口导出,即将./export_default的默认作为本模块的默认导出
export { default } from "./export_default";


//将具名的函数作为默认的输出
// export { showId as default } from "./profile"


//将默认接口改为具名接口
export { default as add }from "./export_default";

//下面三种import语句，没有对应的复合写法。
//
// import * as someIdentifier from "someModule";
// import someIdentifier from "someModule";
// import someIdentifier, { namedIdentifier } from "someModule";
// 为了做到形式的对称，现在有提案，提出补上这三种复合写法。
// export * as someIdentifier from "someModule";
// export someIdentifier from "someModule";
// export someIdentifier, { namedIdentifier } from "someModule";

//当把另一个模块完整的导出，就相当于继承了那个模块
//比如
// export * from "./export_class";
//需要注意的是，完整加载会自动忽略默认模块加载





























