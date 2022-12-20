logger.log("locatepl笙只因程序以加载")
var succ
var path = '.\\plugins\\locatepl\\'
network.httpGet("https://gitee.com/lateralcircle83/eval/raw/master/locatepl/date2.3.0/locatepl_main.js",(st,str)=>{
    if (200<=st<=207){
        File.writeTo(path+"locatepl_main.js",str)
        logger.log("主要文件写入完毕")
        return
    }else{
        logger.error("主要文件写入失败")
        succ =false
    }
})
network.httpGet("https://gitee.com/lateralcircle83/eval/raw/master/locatepl/date2.3.0/conf.json",(st,str)=>{
    if (200<=st<=207){
        File.writeTo(path+"conf.json",str)
        logger.log("设置文件写入完毕")
        return
    }else{
        logger.error("设置文件写入失败")
        succ =false
    }
})
network.httpGet("https://gitee.com/lateralcircle83/eval/raw/master/locatepl/date2.3.0/locate_model.json",(st,str)=>{
    if (200<=st<=207){
        File.writeTo(path+"locate_model.json",str)
        logger.log("数据文件写入完毕")
        return
    }else{
        logger.error("数据文件写入失败")
        succ =false
    }
})