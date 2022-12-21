//LiteLoaderScript Dev Helper
/// <reference path="d:\LateralCircle83\object/dts/llaids/src/index.d.ts"/>

ll.registerPlugin("locatepl", "查找附近自然建筑", [2, 3, 1], { "开源许可证": "GPL-2.0" })


log("locatepl插件以加载，作者later")
//定义配置文件
var readconf = new JsonConfigFile(".\\plugins\\locatepl\\conf.json")
var readpath = new JsonConfigFile(".\\plugins\\locatepl\\player.json")
var readmodel = new JsonConfigFile(".\\plugins\\locatepl\\locate_model.json",)
// 初始化配置文件player
readpath.init("Overworld", {})
readpath.init("Nether", {})
readpath.init("End", {})
//主线部分
// 定义命令
var command = mc.newCommand("locatepl", "查找自然建筑", PermType.Any, 0x80, "lcpl")
command.setEnum("with_gui_enum", ["gui"])
// 必选参数1.gui
command.mandatory("with_gui", ParamType.Enum, "with_gui_enum")
command.setEnum("with_gui_back_enum", ["op", "list", "find"])
// 可选参数1.locatepl gui 【1，2，3】
command.optional("with_gui_back", ParamType.Enum, "with_gui_back_enum")
// 命令重载gui
command.overload(["with_gui", "with_gui_back"])
// 定义第二命令add
//command.setEnum("")
command.setCallback((_cmd, origin, output, res) => {
    if (origin.type == 0) {
        var player = origin.player
        switch (res.with_gui) {
            case "gui":
                switch (res.with_gui_back) {
                    case "op":
                        locateplop(player)
                        break
                    case "list":
                        locateplknowo(player)
                        break
                    case "find":
                        locatepl(player)
                        break
                    default:
                        menu_indx(player)
                        break
                }
                break
            default:
                output.error("你他妈故意找茬是吧")
        }
    } else { output.error("此命令只能在玩家下执行") }
})
command.setup()
// 菜单成分构建
function idonknow() {
    var firstfm = mc.newSimpleForm()
    firstfm.setTitle("§8l§9o§ac§ba§ct§de§ep§fl§k窗§l口")
    firstfm.setContent("§e§l选择一个要操作的功能")
    firstfm.addButton("§2§l查找建筑菜单")
    firstfm.addButton("§gop面板")
    if (readconf.get("all_locate") == true) firstfm.addButton("§b已知对象")
    return firstfm
}
// 构建所有列表表单
function form_exectend(world_name) {
    var matter = mc.newSimpleForm()
    matter.setTitle("§8l§9o§ac§ba§ct§de§ep§fl§k窗§l口")
    matter.setContent("当前维度："+world_name)
    let str_list = readmodel.get(world_name)
    if (str_list[0] == null) { return matter }
    for (var i = 0, len = str_list.length; i < len; i++) {
        switch (str_list[i].allow_find) {
            case true:
                if (str_list[i].picture == null) {
                    matter.addButton(str_list[i].cn_name)
                } else { matter.addButton(str_list[i].cn_name, str_list[i].picture) }
                break
            case false:
                continue
        }
    }
    return matter
}
// 构建主要菜单
function menu_indx(pl) {
    pl.sendForm(idonknow(), function (pl, id) {
        if (id == 0) { locatepl(pl) } //点击主菜单
        if (id == 2) { locateplknowo(pl) }//点击一直对象
        if (id == 1) { locateplop(pl) }//点击op面板
    })
}
// 查找建筑主线菜单
function locatepl(pl) {
    // 获取玩家维度
    let theworld = ["Overworld", "Nether", "End"]
    let testword = pl.pos.dimid
    let plworld = theworld[testword]
    // 获取设置信息
    let pos_to_move = readconf.get("pos_to_move")
    let player_find_by = readconf.get("player_find_by")
    let player_on_ = readconf.get("player_on_")
    let maney_way = readconf.get("money")
    var is_llmoney, pl_money
    if (maney_way == "llmoney") {
        is_llmoney = true
    } else { is_llmoney = false }
    // 函数列表，屎山代码，不会改了
    //let the_form = [idonknowtwo(), idonknowthree(), idonknowfour()]
    // 函数预备
    pl.sendForm(form_exectend(plworld), (pl, id) => {
        if (id != null) {
            // let theobj = { 0: ["buriedtreasure", "mansion", "mineshaft", "monument", "ruins", "shipwreck", "stronghold", "temple", "village", "pillageroutpost", "ruinedportal", "ancientcity"], 1: ["fortress", "bastionremnant", "ruinedportal"], 2: ["endcity"] }
            // let pm = theobj[testword]
            // let pmm = pm[id]
            // 获取点击的建筑全部信息
            let str_all = readmodel.get(plworld)[id]
            let locate_money_useNewChunksOnly = str_all.use_money_useNewChunksOnly
            let locate_money_common = str_all.use_money_common
            switch (is_llmoney) {
                case true:
                    pl_money = pl.getMoney()
                    break
                case false:
                    pl_money = pl.getScore(maney_way)
                    break
            }
            // 二级菜单：付费标准
            pl.sendSimpleForm(str_all.cn_name, "您当前拥有的小钱钱：" + String(pl_money) + "\n请选择您要的套餐", ["普通查找，可能找到被别人搞过的：" + String(locate_money_common), "在新区块查找，没被别人搞过哦~：" + String(locate_money_useNewChunksOnly)], ["", ""], (pl, idd) => {
                let way_to_pay = [locate_money_common, locate_money_useNewChunksOnly]
                let bool = [false,true]
                if (idd==null){
                    return false
                }
                if (pl_money < way_to_pay[idd]) {
                    pl.tell("[locatepl]您没有足够的小钱钱！")
                    return false
                }
                // 获取英文名
                let enname = str_all.en_name
                // 执行命令主体
                let commond = mc.runcmdEx(`execute at "${pl.name}" run locate structure ${enname} ${bool[idd]}`)
                log(commond.output)
                // 结果取正则表达式【123】
                let common = commond.output.match(/(\-|\+)?\d+(\.\d+)?/g)
                if (commond.output == "Failed to execute 'locate' as [Null]") {
                    pl.tell("找不到此类建筑")
                } else {
                    // 运算输出区
                    pl.tell("********************")
                    // 类型控件
                    pl.tell("[类型]" + str_all.cn_name)
                    // 取建筑的x，z坐标
                    let thex = common[0]
                    let thez = common[1]
                    // 坐标输出控件
                    pl.tell("[坐标] x：" + thex + " z：" + thez)
                    // 扫描记录控件
                    // 判断功能开启
                    let pos = [thex,thez]
                    if (player_on_ == true) {
                        // 获取信息记录文件的对应世界键位
                        let peopletotha = readpath.get(plworld)
                        // 获取信息记录文件的对应建筑键位
                        let peopletothat = peopletotha[enname]
                        // 判断键位是否存在
                        // 不存在
                        if (peopletothat == null) {
                            // 插入健
                            peopletotha[enname] = []
                            // 写入建
                            readpath.set(plworld, peopletotha)
                            pl.tell("[locatepl]等Ⅰ等")
                            peopletothat=peopletotha[enname]
                        }
                        /*我也不知道我当时为啥要这么写
                        不过我现在不想改了*/
                        // 判断建筑记录值是否记录过
                        // 非空集
                        if (peopletothat.length >= 1) {
                            // 穷举相似性
                            for (var i = 0, len = peopletothat.length; i < len; i++) {
                                // 获取第i相字符串
                                let asd = peopletothat[i]
                                // 判断相识
                                // 相识
                                if (asd == pos) {
                                    pl.tell("[状态]被扫描")
                                    // 跳出循环
                                    break
                                } else {
                                    // 最后一项都不符合
                                    if (i == len - 1) {
                                        // 写入配置
                                        pl.tell("[状态]未被扫描")
                                        peopletothat.push(String(pos))
                                        peopletotha[enname] = peopletothat
                                        readpath.set(plworld, peopletotha)
                                    }
                                }
                            }
                        } else {
                            // 空集合，写入配置
                            pl.tell("[状态]未被扫描")
                            peopletothat.push(String(pos))
                            peopletotha[enname] = peopletothat
                            readpath.set(plworld, peopletotha)
                        }
                    } else {
                        // 控件不开启，逻辑同上
                        let peopletotha = readpath.get(plworld)
                        let peopletothat = peopletotha[enname]
                        //az
                        if (peopletothat.length >= 1) {
                            for (var i = 0, len = peopletothat.length; i < len; i++) {
                                let asd = peopletothat[i]
                                if (asd == pos) {
                                    break
                                } else {
                                    if (i == len - 1) {
                                        peopletothat.push(String(pos))
                                        peopletotha[enname] = peopletothat
                                        readpath.set(plworld, peopletotha)
                                    }
                                }
                            }
                        } else {
                            peopletothat.push(String(pos))
                            peopletotha[enname] = peopletothat
                            readpath.set(plworld, peopletotha)
                        }
                    }
                    // 相对距离差控件
                    if (pos_to_move == true) {
                        // 数学计算
                        let sdf = thex - pl.pos.x
                        let dfg = thez - pl.pos.z
                        // 输出
                        pl.tell(`[距离差] x:${sdf} z:${dfg}`)
                    }
                    // 周围玩家控件
                    // 这个不动了
                    if (player_find_by == true) {
                        var allpeople = mc.getOnlinePlayers()
                        var lespplayer = []
                        for (var i = 0, len = allpeople.length; i < len; i++) {
                            let plx = allpeople[i].pos.x
                            let plz = allpeople[i].pos.z
                            let pld = allpeople[i].pos.dimid
                            if (pld == plworld) {
                                let longst = Math.sqrt(Math.pow(plx - thex, 2) + Math.pow(plz - thez, 2))
                                if (longst <= 50) { lespplayer.push(allpeople[i].name) }
                            }
                        }
                        if (lespplayer.length < 1) {
                            pl.tell("[附近人]无")
                        } else { pl.tell("[附近人]" + String(lespplayer)) }
                    }
                    pl.tell("********************")
                }
                // 小钱钱的烧
                switch (is_llmoney) {
                    case true:
                        pl.reduceMoney(way_to_pay[idd])
                        outof = pl.getMoney()
                        break
                    case false:
                        let ob=mc.getScoreObjective(maney_way)
                        ob.reduceScore(pl,way_to_pay[idd])
                        outof = pl.getScore(maney_way)
                        break
                }
                pl.tell("[locatepl]已扣除您" + String(way_to_pay[idd]) + "的小钱钱,剩余"+String(outof))
            })

        }
    })
}
function menu_know(the_world){
    // log(readpath)
    // log(the_world)
    let the_locate =readpath.get(the_world)
    // log(the_locate)
    let all_key=Object.keys(the_locate)
    // let all_value=Object.values(the_locate)
    let matter =mc.newSimpleForm()
    matter.setTitle("§8l§9o§ac§ba§ct§de§ep§fl§k窗§l口")
    matter.setContent("选择您要查找的建筑")
    if (all_key==[]){return matter}
    for(var i = 0, len = all_key.length; i < len; i++){
        matter.addButton(all_key[i])
    }
    return matter
}
// 查看已知坐标函数
function locateplknowo(pl) {
    // 构建菜单世界
    pl.sendSimpleForm("查看已被locatepl检查的坐标", "选择地域：", ["主世界", "下界", "末地"], ["", "", ""], (pla, id) => {
        if (id != null) {
            // let the_form = [idonknowtwo(), idonknowthree(), idonknowfour()]
            let theworld = ["Overworld", "Nether", "End"]
            let plworld = theworld[id]
            pla.sendForm(menu_know(plworld), (plb, idb) => {
                if (idb != null) {
                    // let theobj = { 0: ["buriedtreasure", "mansion", "mineshaft", "monument", "ruins", "shipwreck", "stronghold", "temple", "village", "pillageroutpost", "ruinedportal", "ancientcity"], 1: ["fortress", "bastionremnant", "ruinedportal"], 2: ["endcity"] }
                    // let pm = theobj[id]
                    // let pmm = pm[idb]
                    // let totoo = readpath.get(plworld)
                    // let toto = totoo[pmm]
                    let all_str =readpath.get(plworld)
                    let all_str_key=Object.keys(all_str)
                    let str_name=all_str_key[idb]
                    let the_array_of_str=all_str[str_name]
                    let img = []
                    for (var i = 0, len = the_array_of_str.length; i < len; i++) {
                        img.push("")
                    }
                    if (the_array_of_str[0] == null) pl.tell("[locatepl]不存在此类")
                    plb.sendSimpleForm(str_name, "选择坐标", the_array_of_str, img, (plc, idc) => {
                        let zuobiao = the_array_of_str[idc]
                        plc.tell("********************")
                        plc.tell(`[类型]${str_name}`)
                        plc.tell(`[坐标]${plworld}${zuobiao}`)
                        plc.tell("********************")
                    })
                }
            })
        }
    }
    )
}
function oplesthh() {
    var fmop = mc.newCustomForm()
    let OP = readconf.get("all_locate")
    let pos_to_move = readconf.get("pos_to_move")
    let player_find_by = readconf.get("player_find_by")
    let player_on_ = readconf.get("player_on_")
    let money=readconf.get("money")
    fmop.setTitle("op面板")
    fmop.addLabel("这里可以设置基本元素")
    fmop.addSwitch("列出已知遗迹", Boolean(OP))
    fmop.addSwitch("距离差是否显示", Boolean(pos_to_move))
    fmop.addSwitch("所在范围玩家", Boolean(player_find_by))
    fmop.addSwitch("是否被扫描过", Boolean(player_on_))
    fmop.addInput("选择经济来源,llmoney外任何文本都是计分板","llmoney/score",money)
    fmop.addLabel("注意：本修改可能不能立即生效")
    return fmop
}
function locateplop(pl) {
    if (pl.isOP() == true) {
        pl.sendForm(oplesthh(), (_pla, callbacket) => {
            if (callbacket != null) {
                readconf.set("all_locate", Boolean(callbacket[1]))
                readconf.set("pos_to_move", Boolean(callbacket[2]))
                readconf.set("player_find_by", Boolean(callbacket[3]))
                readconf.set("player_on_", Boolean(callbacket[4]))
                readconf.set("money",callbacket[5])
            }
        })
    } else { pl.tell("[locatepl]你木大权限") }
}