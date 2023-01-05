//LiteLoaderScript Dev Helper
/// <reference path="d:\LateralCircle83\object/dts/llaids/src/index.d.ts"/>


ll.registerPlugin("locatepl_first", "locatepl表层", [0, 0, 2], {})
logger.log("locatepl插件正在试图加载")
var is_turn_vs, the_vs
var path = '.\\plugins\\locatepl\\'
var the_life_on = File.readFrom(path + "conf.json")
logger.log("获取版本中")
if (the_life_on == null) {
    logger.warn("您没有安装任何版本！请移步至minebbs手动获取新版本")
} else {
    log("检测版本中……连接云端库")
    the_vs = JSON.parse(the_life_on).version
    network.httpGet("https://gitee.com/lateralcircle83/eval/raw/master/locatepl/version.txt", (st, str) => {
        if (st==200) {
            logger.log("成功获取版本信息")
            if (the_vs != str) {
                logger.log("检测到新版本" + str)
                // log(str)
                network.httpGet("https://gitee.com/lateralcircle83/eval/raw/master/locatepl/update.js", (st, str) => {
                    if (st==200) {
                        ll.eval(str)
                    } else {
                        logger.error("无法连接服务器，请移步至minebbs手动获取新版本")
                        logger.warn("将启动您固有的版本")
                        mc.runcmdEx("ll load ./plugins/locatepl/locatepl_main.js"); mc.runcmdEx("ll unload locatepl_first")
                    }
                })
                return
            } else {
                // log(str)
                logger.log("您不需要更新")
                mc.runcmdEx("ll load ./plugins/locatepl/locatepl_main.js"); mc.runcmdEx("ll unload locatepl_first")
            }
        } else {
            logger.error("获取版本信息失败！")
            // logger.error("无法连接服务器，请移步至minebbs手动获取新版本")
            logger.warn("将启动您固有的版本")
            mc.runcmdEx("ll load ./plugins/locatepl/locatepl_main.js"); mc.runcmdEx("ll unload locatepl_first")
            // is_turn_vs = null
            return
        }

        // switch (JSON.parse(the_life_on).version) { }
    })
}
/*switch (is_turn_vs) {
    case true:
        network.httpGet("https://gitee.com/lateralcircle83/eval/raw/master/locatepl/update.js", (st, str) => {
            if (200 <= st <= 207) {
                ll.eval(str)
            } else { logger.error("无法连接服务器，请移步至minebbs手动获取新版本") }
        })
        break
    case false:
        mc.runcmdEx("ll load './/plugins//locatepl//locatepl_main.js'"); mc.runcmdEx("ll unload locatepl_first")
        break
    default:
        logger.warn("将启动您固有的版本")
        mc.runcmdEx("ll load './/plugins//locatepl//locatepl_main.js'"); mc.runcmdEx("ll unload locatepl_first")
        break
}*/
