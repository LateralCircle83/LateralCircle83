/**⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⢀⠀⢀⣀⣀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣐⣤⡦⢏⠵⡶⢿⣿⡇⠕⠋⢍⠉⡱⡊⡣⠤⠤⢄⡀⠀⠀⠀⠀
⠀⠀⠀⠀⢰⠑⠻⣿⠃⣀⣃⠄⣴⣯⠘⠀⢠⢃⣘⠁⣨⠠⡔⠤⠤⠕⡦⠀⠀⠀
⠀⠀⠀⠈⡆⠀⠀⠀⠀⠿⡿⠘⠿⠟⢃⠀⠈⠒⠊⠐⢄⡠⠃⠀⠀⠀⡇⠀⠀⠀
⠀⠀⠀⠀⠸⢄⡀⠀⠀⡀⠄⠀⠀⠈⢐⠒⡁⠁⠂⠀⢄⠠⡀⢀⣀⠔⠃⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⢃⡂⠀⠀⠀⡔⠺⢁⠄⠀⠀⠀⠀⢀⣀⣀⡸⠀⠁⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢨⠂⠀⠀⠀⠄⠒⠃⠀⠀⠀⠀⠀⠀⠈⠒⠿⢄⡀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⡖⠲⣤⢀⣀⡐⣤⣤⣀⢀⡠⠐⠂⠤⠀⡀⠀⠀⠓⠢⡀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢜⢃⣰⣿⣿⣿⣿⣿⣿⠇⠀⠀⣠⠤⠤⡀⠄⠀⠀⠀⢹⠄⠀
⠀⠀⠀⠀⠀⠀⠀⢢⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⢐⠚⠀⠀⠀⠀⠀⠀⢀⠜⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣦⣀⣀⡀⠀⠀⢀⡠⠒⠊⠅⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⠻⡿⢿⣿⣿⡿⠿⠿⠃⠀⠈⠉⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀  
*作者：LateralCircle83
*开源地址：https://gitee.com/lateralcircle83/eval/tree/master/%E6%8C%87%E5%8D%97%E9%92%88
*本插件完全免费，如有侵权请立即举报
*/
//LiteLoaderScript Dev Helper
/// <reference path="d:\LateralCircle83\object/dts/llaids/src/index.d.ts"/> 

ll.registerPlugin(
    /* name */ "direction",
    /* introduction */ "方向，实时播报旋转角",
    /* version */[0, 1, 3,1],
    /* otherInformation */ { "作者": "LateralCircle83", "许可证": "GPL-2.0" }
);

if (!ll.hasExported(`cup`, `checkUpdate`)) {
    logger.error("满极客先生提醒你")
    logger.warn(`检查更新失败！辅助插件CheckUpdate未安装。>>前往免费下载：https://www.minebbs.com/resources/checkupdate.4792/`);
}else{
    const checkUpdate=ll.import(`cup`, `checkUpdate`)
    checkUpdate("direction",5136,[1,3,1])}
var all_ids = {}
const power = 3.333333333333333
// 导出函数
ll.export(add_direction, "direction", "add_direction")
ll.export(del_direction, "direction", "del_direction")
ll.export(list_direction,"direction", "list_direction")
// 抛出命令
var cmd = mc.newCommand("direction", "罗盘指针系统", PermType.Any,0x80,"dir")
cmd.setEnum("start_",["start","stop","list","remove_all"])
cmd.setEnum("move_to",["point_to"])
cmd.setEnum("move_re",["point_out"])
cmd.mandatory("act",ParamType.Enum,"start_",1)
cmd.mandatory("act",ParamType.Enum,"move_to",1)
cmd.mandatory("act",ParamType.Enum,"move_re",1)
cmd.mandatory("pos",ParamType.Vec3)
cmd.mandatory("name",ParamType.String)
cmd.optional("string",ParamType.String)
cmd.overload("start_")
cmd.overload("move_re","name")
cmd.overload("move_to","name","pos","string")
cmd.setCallback((_cmd, origin, output, res) => {
    switch (origin.type) {
        case 0:
            //还没定义
            let pl = origin.player
            // pl.delExtraData("direction")
            switch(res.act){
                case "start":
                    if(pl.hasTag("on_dir_open_true")) {output.error("你已经开启！");return}
                    pl.addTag("on_dir_open_true")
                    start(pl)
                    break
                case "stop":
                    if(!pl.hasTag("on_dir_open_true")){output.error("您没开启！");return}
                    pl.removeTag("on_dir_open_true")
                    stoper(pl)
                    break
                case "list":
                    let date = pl.getExtraData("direction"),word="存在如下信息：\n"
                    if(date==null){output.success("没有标记点！");return}
                    for(var p in date){
                        word=word+p+":"+date[p][1]+"\n"
                    }
                    output.success(word)
                    break
                case "point_to":
                    add_direction(pl,res.pos,res.name,res.string)
                    break
                case "point_out":
                    del_direction(pl,"ahh",res.name)
                    break
                case "remove_all":
                    del_direction(pl,"all")
                    break
            }
            break
        default:
            output.error("你必须是玩家")
    }
})
cmd.setup()
// 设置玩家记录函
// obj={}
/**
 * 
 * @param {player} pl 玩家对象
 * @param {pos} pos 坐标对象
 * @param {string} name 操作名称
 * @param {string} _color 显示字符
 * @returns {Boolean}
 */
function add_direction(pl, pos, name,_color) {
    const color =_color||"§e+§r"
    let date = pl.getExtraData("direction")
    if (date == null) {
        let obj = {}
        obj[name] = [pos,color]
        pl.setExtraData("direction", obj)
        return true
    }
    else {
        if (date[name] == null) {
            date[name] = [pos,color]
            pl.setExtraData("direction", date)
            return true
        } else { return false }
    }
}
// 删除绑定信息
/**
 * 
 * @param {player} pl 玩家对象
 * @param {string} way 删除方式
 * @param {string} _name 操作名称
 * @returns {Boolean}
 */
function del_direction(pl, way, _name) {
    if (way == "all") {
        pl.delExtraData("direction")
        return true
    }
    let date = pl.getExtraData("direction")
    if (way != "all") {
        if(_name==null){
            return false
        }else{
            if (date[_name] == null) {
                return false
            } else {
                delete date[_name]
                pl.setExtraData("direction", date)
                return true
            }
        }
    }
}
// 主要运行程序
function start(_pl){
    let id = Number(_pl.xuid)
    var sert = setInterval(function () {
        const plxuid = _pl.xuid
        const pl = mc.getPlayer(plxuid)
        var obj = { "-13": null, "-12": null, "-11": null, "-10": null, "-9": null, "-8": null, "-7": null, "-6": null, "-5": null, "-4": null, "-3": null, "-2": null, "-1": null, "0": null, "1": null, "2": null, "3": null, "4": null, "5": null, "6": null, "7": null, "8": null, "9": null, "10": null, "11": null, "12": null, "13": null }
        // 查找指南坐标
        var loca_dir_all = with_pos_dir(pl)
        var loca_dir=loca_dir_all[0]||[]
        var loca_color=loca_dir_all[1]||[]
        //log(loca_dir)
        let the_dires = pl.direction.yaw
        if (the_dires < 0) {
            the_dires = the_dires + 360
        }
        let xiangdui = parseInt(the_dires / power)
        for (var e = -13; e != 14; e++) {
            //log(xiangdui)
            //log(xiangdui + e)
            //判断是否有四大天王角
            switch (xiangdui + e) {
                case 0:
                    obj[e.toString()] = "§c南§r"
                    break
                case 27:
                    obj[e.toString()] = "§c西§r"
                    break
                case 54:
                    obj[e.toString()] = "§c北§r"
                    break
                case 81:
                    obj[e.toString()] = "§c东§r"
                    break
                case 108:
                    obj[e.toString()] = "§c南§r"
                    break
                default:
                    // 替换api指向
                    let kys=loca_dir.indexOf(xiangdui + e)
                    if (kys != -1) {
                        obj[e.toString()] = loca_color[kys]
                    } else {
                        //没有替换为-
                        obj[e.toString()] = "-"
                    }
                    //log(string)
                    break
            }
        }
        let str = `|${obj["-13"]} ${obj["-12"]} ${obj["-11"]} ${obj["-10"]} ${obj["-9"]} ${obj["-8"]} ${obj["-7"]} ${obj["-6"]} ${obj["-5"]} ${obj["-4"]} ${obj["-3"]} ${obj["-2"]} ${obj["-1"]} ${obj["0"]} ${obj["1"]} ${obj["2"]} ${obj["3"]} ${obj["4"]} ${obj["5"]} ${obj["6"]} ${obj["7"]} ${obj["8"]} ${obj["9"]} ${obj["10"]} ${obj["11"]} ${obj["12"]} ${obj["13"]}|`
        pl.setBossBar((Number(plxuid) - 83) / 2, str, 100, 3)
    }, 20)
    all_ids[id] = sert
}
// 玩家脱离循环
function stoper(pl){
    clearInterval(all_ids[Number(pl.xuid)])
    delete all_ids[Number(pl.xuid)]
    pl.removeBossBar((Number(pl.xuid) - 83)/2)
}
// 坐标计算角度
function with_pos_dir(pl) {
    let date = pl.getExtraData("direction")
    if (date == null) {
        return []
    }
    // log(date)
    let plos = pl.pos, dimi = plos.dimid
    var dir_list = []
    var dir_color=[]
    for (var i = 0, len = Object.keys(date).length; i < len; i++) {
        let date_this = Object.values(date)[i][0]
        let date_color=Object.values(date)[i][1]
        if (date_this.dimid != dimi) { continue }
        let ax = plos.x - date_this.x, az = date_this.z - plos.z, r = Math.sqrt(ax*ax+az*az)
        let tan = ax / az, sin = ax / r, dir_yuanshi = getTanDeg(tan)
        // log(tan,sin,r,dir_yuanshi)
        // 判断距离是否为0
        if (r == 0) { continue }
        // 放入材质
        dir_color.push(date_color)
        // 一般情况，不在正方向
        if (tan > 0) {
            if (sin > 0) {
                dir_list.push(parseInt(dir_yuanshi / power))
                dir_list.push(parseInt(dir_yuanshi / power)+108)
                dir_color.push(date_color)
                continue
            }
            if (sin < 0) {
                dir_list.push(parseInt((dir_yuanshi + 180) / power))
                continue
            }
        }
        if (tan < 0) {
            if (sin > 0) {
                dir_list.push(parseInt((dir_yuanshi + 180) / power))
                continue
            }
            if (sin < 0) {
                dir_list.push(parseInt((dir_yuanshi + 360) / power))
                dir_list.push(parseInt((dir_yuanshi + 360) / power)-108)
                dir_color.push(date_color)
                continue
            }
        }
        // 在对称轴上
        // 在x轴
        if (tan == Infinity) {
            dir_list.push(27)
            continue
        }
        if (tan == -Infinity) {
            dir_list.push(81)
            continue
        }
        // 在yshang
        if (tan == 0) {
            dir_list.push(0)
            continue
        }
        if (tan == -0) {
            dir_list.push(54)
            continue
        }
        
    }
    return [dir_list,dir_color]
}
// 已知tan求角度
function getTanDeg(tan) {
    var result = Math.atan(tan) / (Math.PI / 180);
    result = Math.round(result);
    return result;
}
// 设置监听
mc.listen("onJoin",(pl)=>{
    switch(pl.hasTag("on_dir_open_true")){
        case true:
            start(pl)
            break
        case false:
            return
    }
})
mc.listen("onLeft",(pl)=>{
    stoper(pl)
    return
})
// 获取玩家定位项全部信息
/**
 * 
 * @param {player} pl 玩家对象
 * @returns {Object} 所有目标
 */
function list_direction(pl){
    let date = pl.getExtraData("direction")
    return date
}
//挂载服务器启动监听
/*mc.listen("onServerStarted", () => {
    //设置周期启动
    setInterval(function () {
        //声明输出string
        // var string = "|{-13}{-12}{-11}{-10}{-9}{-8}{-7}{-6}{-5}{-4}{-3}{-2}{-1}§a{0}§r{1}{2}{3}{4}{5}{6}{7}{8}{9}{10}{11}{12}{13}|"
        let all_players = mc.getOnlinePlayers()
        //开始构建屎山循环
        for (var i = 0, len = all_players.length; i < len; i++) {
            var string={"-13":null,"-12":null,"-11":null,"-10":null,"-9":null,"-8":null,"-7":null,"-6":null,"-5":null,"-4":null,"-3":null,"-2":null,"-1":null,"0":null,"1":null,"2":null,"3":null}
            // var string = "|{-13}{-12}{-11}{-10}{-9}{-8}{-7}{-6}{-5}{-4}{-3}{-2}{-1}§a{0}§r{1}{2}{3}{4}{5}{6}{7}{8}{9}{10}{11}{12}{13}|"
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

            }
        }
    }, 20)
})     */