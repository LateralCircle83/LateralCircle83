//LiteLoaderScript Dev Helper
/// <reference path="d:\LateralCircle83\object/dts/llaids/src/index.d.ts"/> 

ll.registerPlugin(
    /* name */ "direction",
    /* introduction */ "方向，实时播报旋转角",
    /* version */[0, 0, 1],
    /* otherInformation */ {"作者":"LateralCircle83","许可证":"GPL-2.0"}
);

var all_ids = {}
var power = 3.333333333333333
//挂载服务器启动监听
mc.listen("onServerStarted", () => {
    //设置周期启动
    setInterval(function () {
        //声明输出string
        // var string = "|{-13}{-12}{-11}{-10}{-9}{-8}{-7}{-6}{-5}{-4}{-3}{-2}{-1}§a{0}§r{1}{2}{3}{4}{5}{6}{7}{8}{9}{10}{11}{12}{13}|"
        let all_players = mc.getOnlinePlayers()
        //开始构建屎山循环
        for (var i = 0, len = all_players.length; i < len; i++) {
            var string = "|{-13}{-12}{-11}{-10}{-9}{-8}{-7}{-6}{-5}{-4}{-3}{-2}{-1}§a{0}§r{1}{2}{3}{4}{5}{6}{7}{8}{9}{10}{11}{12}{13}|"
            //获取玩家旋转角
            let the_dires = all_players[i].direction.yaw
            //获取负角的终边相同角2kΠ+a
            if (the_dires < 0) {
                the_dires = the_dires + 360
            }
            //将角度分为108份，不足取整
            let xiangdui = parseInt(the_dires / power)
            //循环取周围环境整角度-13~13
            for (var e = -13; e != 14; e++) {
                //log(xiangdui)
                //log(xiangdui + e)
                //判断是否有四大天王角
                switch (xiangdui + e) {
                    case 0:
                        re = "{"+e.toString()+"}"
                        string = string.replace(re, "§c南§r")
                        //log(string)
                        break
                    case 27:
                        re = "{"+e.toString()+"}"
                        string =string.replace(re, "§c西§r")
                        break
                    case 54:
                        re = "{"+e.toString()+"}"
                        string =string.replace(re, "§c北§r")
                        break
                    case 81:
                        re = "{"+e.toString()+"}"
                        string =string.replace(re, "§c东§r")
                        break
                    case 108:
                        re = "{"+e.toString()+"}"
                        string =string.replace(re, "§c南§r")
                        //log(re)
                        break
                    default:
                        //没有替换为-
                        re = "{"+e.toString()+"}"
                        string =string.replace(re, "-")
                        //log(string)
                        break
                }
            }
            
            //log(string)
            let player =all_players[i]
            player.setBossBar(parseInt(player.xuid),string,100,3)
            /*for (var e = -13; e != 14; e++) {
                let xd =parseInt(xiangdui)
                switch (xd + e) {
                    case 0:
                        ll.eval("let res = /{" + e.toString() + "}/g")
                        string.replace(res, "§c南§r")
                        break
                    case 27:

            }*/
        }
    }, 20)
})