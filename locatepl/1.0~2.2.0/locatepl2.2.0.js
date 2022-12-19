//LiteLoaderScript Dev Helper
/// <reference path="d:\LateralCircle83\object/dts/llaids/src/index.d.ts"/> 


ll.registerPlugin("locatepl", "查找附近自然建筑", [2, 2, 0], { "开源许可证": "GPL-3.0" })
colorLog("green", "loading locatepl")
var readconf = new JsonConfigFile(".\\plugins\\locatepl\\conf.json", '{"all_locate":true,"pos_to_move":true,"player_find_by":true,"player_on_":true}')
var readpath = new JsonConfigFile(".\\plugins\\locatepl\\player.json", '{"Overworld":{"buriedtreasure":[],"mansion":[],"mineshaft":[],"monument":[],"ruins":[],"shipwreck":[],"stronghold":[],"temple":[],"village":[],"pillageroutpost":[],"ruinedportal":[],"ancientcity":[]},"End":{"endcity":[]},"Nether":{"fortress":[],"bastionremnant":[],"ruinedportal":[]}}')
colorLog("green", "读取文件成功")
mc.regPlayerCmd("locatepl", "§o§a查看最近的生成建筑", function (pl) {
    pl.sendForm(idonknow(), function (pl, id) {
        if (id == 0) { locatepl(pl) } //点击主菜单
        if (id == 2) { locateplknowo(pl) }//点击一直对象
        if (id == 1) { locateplop(pl) }//点击op面板
    })
})
//第一层菜单
function idonknow() {
    var firstfm = mc.newSimpleForm()
    firstfm.setTitle("§8l§9o§ac§ba§ct§de§ep§fl§k窗§l口")
    firstfm.setContent("§e§l选择一个要操作的功能")
    firstfm.addButton("§2§l查找建筑菜单")
    firstfm.addButton("§gop面板")
    if (readconf.get("all_locate") == true) firstfm.addButton("§b已知对象")
    return firstfm
}
// 主世界菜单
function idonknowtwo() {
    let secondfm = mc.newSimpleForm()
    secondfm.setTitle("§8l§9o§ac§ba§ct§de§ep§fl§k窗§l口")
    secondfm.setContent("当前维度：主世界")
    secondfm.addButton("§1埋藏的宝藏", "https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/c/c8/Chest_JE2_BE3.png/revision/latest/scale-to-width-down/120?cb=20190402044441")
    secondfm.addButton("§2林地府邸", "https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/5/5d/Woodland_Mansion.png/revision/latest/scale-to-width-down/290?cb=20200824075325")
    secondfm.addButton("§3废弃矿井", "https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/5/52/Mineshaft.png/revision/latest/scale-to-width-down/250?cb=20210711033604")
    secondfm.addButton("§4海底神殿", "https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/2/2c/Ocean_monument.png/revision/latest/scale-to-width-down/200?cb=20201023041053")
    secondfm.addButton("§5海底废墟", "https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/0/02/Underwater_ruin_cold.png/revision/latest/scale-to-width-down/275?cb=20180616144141")
    secondfm.addButton("§6沉船", "https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/e/e8/Shipwreck_Jungle_%28With_Mast%29.png/revision/latest/scale-to-width-down/250?cb=20190824103109")
    secondfm.addButton("§7要塞", "https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/a/ae/StrongholdPortalRoom.png/revision/latest/scale-to-width-down/250?cb=20210608015800")
    secondfm.addButton("§8temple", "https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/5/54/EnvCSS.png/revision/latest?cb=20210120043415&format=original")
    secondfm.addButton("§9村庄", "https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/0/01/Plains_Small_House_3.png/revision/latest/scale-to-width-down/250?cb=20190525104337")
    secondfm.addButton("§a掠夺者前哨站", "https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/8/8c/Pillager_outpost_watchtower.png/revision/latest/scale-to-width-down/250?cb=20190206115724")
    secondfm.addButton("§f废弃传送门", "https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/a/a1/Overworld_Ruined_Portal_1.png/revision/latest/scale-to-width-down/250?cb=20210715104633")
    secondfm.addButton("§1远古城市", "https://wiki.biligame.com/mc/%E6%96%87%E4%BB%B6:Ancient_City_SE.png")
    return secondfm
}
function idonknowthree() {
    let thirdfm = mc.newSimpleForm()
    thirdfm.setTitle("§8l§9o§ac§ba§ct§de§ep§fl§k窗§l口")
    thirdfm.setContent("当前维度：下界")
    thirdfm.addButton("§c下界要塞", "https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/c/cb/Nether_Fortress.png/revision/latest/scale-to-width-down/250?cb=20210508142956")
    thirdfm.addButton("§e堡垒遗迹", "https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/2/26/Bastion_Remnant_2.png/revision/latest/scale-to-width-down/250?cb=20200422100411")
    thirdfm.addButton("§f废弃传送门", "https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/a/a1/Overworld_Ruined_Portal_1.png/revision/latest/scale-to-width-down/250?cb=20210715104633")
    return thirdfm
}
function idonknowfour() {
    let forfm = mc.newSimpleForm()
    forfm.setTitle("§8l§9o§ac§ba§ct§de§ep§fl§k窗§l口")
    forfm.setContent("当前维度：末地")
    forfm.addButton("§0末地城", "https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/d/d8/EndCityEntrance.png/revision/latest/scale-to-width-down/250?cb=20190829020145")
    return forfm
}
function locatepl(pl) {
    let theworld = ["Overworld", "Nether", "End"]
    let testword = pl.pos.dimid
    let plworld = theworld[testword]
    let pos_to_move = readconf.get("pos_to_move")
    let player_find_by = readconf.get("player_find_by")
    let player_on_ = readconf.get("player_on_")
    let the_form = [idonknowtwo(), idonknowthree(), idonknowfour()]
    pl.sendForm(the_form[testword], (pl, id) => {
        if (id != null) {
            let theobj = { 0: ["buriedtreasure", "mansion", "mineshaft", "monument", "ruins", "shipwreck", "stronghold", "temple", "village", "pillageroutpost", "ruinedportal", "ancientcity"], 1: ["fortress", "bastionremnant", "ruinedportal"], 2: ["endcity"] }
            let pm = theobj[testword]
            let pmm = pm[id]
            let commond = mc.runcmdEx("execute at " + pl.name + " run locate structure " + pmm)
            log(commond.output)
            let common = commond.output.match(/(\-|\+)?\d+(\.\d+)?/g)
            if (commond.output == "Failed to execute 'locate' as [Null]") {
                pl.tell("找不到此类建筑")
            } else {
                pl.tell("********************")
                pl.tell("[类型]" + pmm)
                let thex = common[0]
                let thez = common[1]
                pl.tell("[坐标] x：" + thex + " z：" + thez)
                if (player_on_ == true) {
                    let peopletotha = readpath.get(plworld)
                    let peopletothat = peopletotha[pmm]
                    if (peopletothat == null) {
                        peopletotha[pmm] = []
                        readpath.set(plworld, peopletotha)
                        pl.tell("[locatepl]等Ⅰ等")
                        return
                    }
                    //az
                    if (peopletothat.length >= 1) {
                        for (var i = 0, len = peopletothat.length; i < len; i++) {
                            let asd = peopletothat[i]
                            if (asd == common) {
                                pl.tell("[状态]被扫描")
                                break
                            } else {
                                if (i == len - 1) {
                                    pl.tell("[状态]未被扫描")
                                    peopletothat.push(String(common))
                                    peopletotha[pmm] = peopletothat
                                    readpath.set(plworld, peopletotha)
                                }
                            }
                        }
                    } else {
                        pl.tell("[状态]未被扫描")
                        peopletothat.push(String(common))
                        peopletotha[pmm] = peopletothat
                        readpath.set(plworld, peopletotha)
                    }
                } else {
                    let peopletotha = readpath.get(plworld)
                    let peopletothat = peopletotha[pmm]
                    //az
                    if (peopletothat.length >= 1) {
                        for (var i = 0, len = peopletothat.length; i < len; i++) {
                            let asd = peopletothat[i]
                            if (asd == common) {
                                break
                            } else {
                                if (i == len - 1) {
                                    peopletothat.push(String(common))
                                    peopletotha[pmm] = peopletothat
                                    readpath.set(plworld, peopletotha)
                                }
                            }
                        }
                    } else {
                        peopletothat.push(String(common))
                        peopletotha[pmm] = peopletothat
                        readpath.set(plworld, peopletotha)
                    }
                }
                if (pos_to_move == true) {
                    let sdf = thex - pl.pos.x
                    let dfg = thez - pl.pos.z
                    pl.tell(`[距离差] x:${sdf} z:${dfg}`)
                }
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
        }
    })
}
function oplesthh() {
    var fmop = mc.newCustomForm()
    let OP = readconf.get("all_locate")
    let pos_to_move = readconf.get("pos_to_move")
    let player_find_by = readconf.get("player_find_by")
    let player_on_ = readconf.get("player_on_")
    fmop.setTitle("op面板")
    fmop.addLabel("这里可以设置基本元素")
    fmop.addSwitch("列出已知遗迹", Boolean(OP))
    fmop.addSwitch("距离差是否显示", Boolean(pos_to_move))
    fmop.addSwitch("所在范围玩家", Boolean(player_find_by))
    fmop.addSwitch("是否被扫描过", Boolean(player_on_))
    fmop.addLabel("注意：本修改可能不能立即生效")
    return fmop
}
function locateplop(pl) {
    if (pl.isOP() == true) {
        pl.sendForm(oplesthh(), (pla, callbacket) => {
            if (callbacket != null) {
                readconf.set("all_locate", Boolean(callbacket[1]))
                readconf.set("pos_to_move", Boolean(callbacket[2]))
                readconf.set("player_find_by", Boolean(callbacket[3]))
                readconf.set("player_on_", Boolean(callbacket[4]))
            }
        })
    } else { pl.tell("[locatepl]你木大权限") }
}
function locateplknowo(pl) {
    pl.sendSimpleForm("查看已被locatepl检查的坐标", "选择地域：", ["主世界", "下界", "末地"], ["", "", ""], (pla, id) => {
        if (id != null) {
            let the_form = [idonknowtwo(), idonknowthree(), idonknowfour()]
            let theworld = ["Overworld", "Nether", "End"]
            let plworld = theworld[id]
            pla.sendForm(the_form[id], (plb, idb) => {
                if (idb != null) {
                    let theobj = { 0: ["buriedtreasure", "mansion", "mineshaft", "monument", "ruins", "shipwreck", "stronghold", "temple", "village", "pillageroutpost", "ruinedportal", "ancientcity"], 1: ["fortress", "bastionremnant", "ruinedportal"], 2: ["endcity"] }
                    let pm = theobj[id]
                    let pmm = pm[idb]
                    let totoo = readpath.get(plworld)
                    let toto = totoo[pmm]
                    let img = []
                    for (var i = 0, len = toto.length; i < len; i++) {
                        img.push("")
                    }
                    if (toto[0] == null) pl.tell("[locatepl]不存在此类")
                    plb.sendSimpleForm(pmm, "选择坐标", toto, img, (plc, idc) => {
                        let zuobiao = toto[idc]
                        plc.tell("********************")
                        plc.tell(`[类型]${pmm}`)
                        plc.tell(`[坐标]${plworld}${zuobiao}`)
                        plc.tell("********************")
                    })
                }
            })
        }
    }
    )
}