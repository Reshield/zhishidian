
var fn = function()  {
    // var item
    // var type = ''
    // var ary = new Array("111","22","33","111",111);
    // var hash = {}
    // for(let i in ary) {
    //     item = ary[i]
    //     type = Object.prototype.toString.call(item)
    //     console.log(type)
    // }
    var haha  = "haha"
    console.log(Object.prototype.toString())
    console.log(Object.prototype.toString.call(haha))
    console.log(haha.__proto__)
    console.log(Object.__proto__)
    //"haha" 中的 this 指向包装对象，既是 String
    //Object.prototype.toString 中的 this 指向的是 toString 这个对象
    //Object.prototype.toString.call("haha") 的意思是把 Object.prototype.toString 方法放到 "haha" 中执行
    //因此输出的格式与 Obejct 的 toString 方法输出的格式相同，既以一个对象形式来输出
    //如果是以 haha.toString() 方法来输出，则只会输出一个字符串内容
}

fn()