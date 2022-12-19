//LiteXLoader Dev Helper
/// <reference path="d:\LateralCircle83\object/Library/JS/Api.js" /> 


log("loading locatepl")
var readconf = new JsonConfigFile(".\\plugins\\locatepl\\conf.json", '{"all_locate":true,"pos_to_move":true,"player_find_by":true,"player_on_":true}')
var readpath = new JsonConfigFile(".\\plugins\\locatepl\\player.json", '{"Overworld":{"buriedtreasure":[],"mansion":[],"mineshaft":[],"monument":[],"ruins":[],"shipwreck":[],"stronghold":[],"temple":[],"village":[],"pillageroutpost":[],"ruinedportal":[]},"End":{"endcity":[]},"Nether":{"fortress":[],"bastionremnant":[],"ruinedportal":[]}}')
log("读取文件成功")
mc.regPlayerCmd("locatepl", "§o§a查看最近的生成建筑", function (pl, are) {
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
// 主世界菜单返回值
function locatepl(pl) {
    let testword = pl.pos.dimid
    let pos_to_move = readconf.get("pos_to_move")
    let player_find_by = readconf.get("player_find_by")
    let player_on_ = readconf.get("player_on_")
    if (testword == 0) {//zhushijie
        pl.sendForm(idonknowtwo(), (pl, id) => {
            let pm = ["buriedtreasure", "mansion", "mineshaft", "monument", "ruins", "shipwreck", "stronghold", "temple", "village", "pillageroutpost", "ruinedportal"]
            let pmm = pm[id]
            let commond = mc.runcmdEx("execute " + pl.name + " ~ ~ ~ locate " + pmm)
            let common = commond.output.match(/\d{1,}/g)
            if (commond.output == "Failed to execute 'locate' as " + pl.name) {
                pl.tell("找不到此类建筑")
            } else {
                pl.tell("********************")
                pl.tell("[类型]" + pmm)
                let thex = common[0]
                let thez = common[1]
                pl.tell("[坐标] x：" + thex + " z：" + thez)
                if (player_on_ == true) {
                    let peopletotha = readpath.get("Overworld")
                    let peopletothat = peopletotha[pmm]
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
                                    readpath.set("Overworld", peopletotha)
                                }
                            }
                        }
                    } else {
                        pl.tell("[状态]未被扫描")
                        peopletothat.push(String(common))
                        peopletotha[pmm] = peopletothat
                        readpath.set("Overworld", peopletotha)
                    }
                } else {
                    let peopletotha = readpath.get("Overworld")
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
                                    readpath.set("Overworld", peopletotha)
                                }
                            }
                        }
                    } else {
                        peopletothat.push(String(common))
                        peopletotha[pmm] = peopletothat
                        readpath.set("Overworld", peopletotha)
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
                        if (pld == 0) {
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
        })
    }
    if (testword == 1) {//xiajie
        pl.sendForm(idonknowthree(), (pl, id) => {
            let pm = ["fortress", "bastionremnant", "ruinedportal"]
            let pmm = pm[id]
            let commond = mc.runcmdEx("execute " + pl.name + " ~ ~ ~ locate " + pmm)
            let common = commond.output.match(/\d{1,}/g)
            if (commond.output == "Failed to execute 'locate' as " + pl.name) {
                pl.tell("找不到此类建筑")
            } else {
                pl.tell("********************")
                pl.tell("[类型]" + pmm)
                let thex = common[0]
                let thez = common[1]
                pl.tell("[坐标] x：" + thex + " z：" + thez)
                if (player_on_ == true) {
                    let peopletotha = readpath.get("Nether")
                    let peopletothat = peopletotha[pmm]
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
                                    readpath.set("Nether", peopletotha)
                                }
                            }
                        }
                    } else {
                        pl.tell("[状态]未被扫描")
                        peopletothat.push(String(common))
                        peopletotha[pmm] = peopletothat
                        readpath.set("Nether", peopletotha)
                    }
                } else {
                    let peopletotha = readpath.get("Nether")
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
                                    readpath.set("Nether", peopletotha)
                                }
                            }
                        }
                    } else {
                        peopletothat.push(String(common))
                        peopletotha[pmm] = peopletothat
                        readpath.set("Nether", peopletotha)
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
                        if (pld == 1) {
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
        })
    }
    if (testword == 2) {//modi
        pl.sendForm(idonknowfour(), (pl, id) => {
            let pm = ["endcity"]
            let pmm = pm[id]
            let commond = mc.runcmdEx(`execute ${pl.name} ~ ~ ~ locate ${pmm}`)
            let common = commond.output.match(/\d{1,}/g)
            if (commond.output == "Failed to execute 'locate' as " + pl.name) {
                pl.tell("找不到此类建筑")
            } else {
                pl.tell("********************")
                pl.tell("[类型]" + pmm)
                let thex = common[0]
                let thez = common[1]
                pl.tell("[坐标] x：" + thex + " z：" + thez)
                if (player_on_ == true) {
                    let peopletotha = readpath.get("End")
                    let peopletothat = peopletotha[pmm]
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
                                    readpath.set("End", peopletotha)
                                }
                            }
                        }
                    } else {
                        pl.tell("[状态]未被扫描")
                        peopletothat.push(String(common))
                        peopletotha[pmm] = peopletothat
                        readpath.set("End", peopletotha)
                    }
                } else {
                    let peopletotha = readpath.get("End")
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
                                    readpath.set("End", peopletotha)
                                }
                            }
                        }
                    } else {
                        peopletothat.push(String(common))
                        peopletotha[pmm] = peopletothat
                        readpath.set("End", peopletotha)
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
                        if (pld == 2) {
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
        })
    }
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
    } else { pl.tell("爬") }
}
function locateplknowo(pl) {
    pl.sendSimpleForm("查看已被locatepl检查的坐标", "选择地域：", ["主世界", "下界", "末地"], ["","",""], (pla, id) => {
        if (id == 0) {
            pla.sendForm(idonknowtwo(), (plb, idb) => {
                let pm = ["buriedtreasure", "mansion", "mineshaft", "monument", "ruins", "shipwreck", "stronghold", "temple", "village", "pillageroutpost", "ruinedportal"]
                let pmm = pm[idb]
                let totoo = readpath.get("Overworld")
                let toto = totoo[pmm]
                let img = []
                for (var i = 0,len = toto.length;i<len;i++) {
                    img.push("")
                }
                if (toto[0] ==null) pl.tell("[locatepl]木大木大木大木大木大木大木大木大")
                plb.sendSimpleForm(pmm,"选择坐标",toto,img,(plc,idc)=>{
                    let zuobiao = toto[idc]
                    plc.tell("********************")
                    plc.tell(`[类型]${pmm}`)
                    plc.tell(`[坐标]主世界${zuobiao}`)
                    plc.tell("********************")
                })
            })
        }
        if (id == 1) {
            pla.sendForm(idonknowthree(), (plb, idb) => {
                let pm = ["fortress", "bastionremnant", "ruinedportal"]
                let pmm = pm[idb]
                let totoo = readpath.get("Nether")
                let toto = totoo[pmm]
                let img = []
                for (var i = 0,len = toto.length;i<len;i++) {
                    img.push("")
                }
                if (toto[0] ==null) pl.tell("[locatepl]木大木大木大木大木大木大木大木大")
                plb.sendSimpleForm(pmm,"选择坐标",toto,img,(plc,idc)=>{
                    let zuobiao = toto[idc]
                    plc.tell("********************")
                    plc.tell(`[类型]${pmm}`)
                    plc.tell(`[坐标]地狱${zuobiao}`)
                    plc.tell("********************")
                })
            })
        }
        if (id == 2) {
            pla.sendForm(idonknowfour(), (plb, idb) => {
                let pm = ["endcity"]
                let pmm = pm[idb]
                let totoo = readpath.get("End")
                let toto = totoo[pmm]
                let img = []
                for (var i = 0,len = toto.length;i<len;i++) {
                    img.push("")
                }
                if (toto[0] ==null) pl.tell("[locatepl]木大木大木大木大木大木大木大木大")
                plb.sendSimpleForm(pmm,"选择坐标",toto,img,(plc,idc)=>{
                    let zuobiao = toto[idc]
                    plc.tell("********************")
                    plc.tell(`[类型]${pmm}`)
                    plc.tell(`[坐标]末地${zuobiao}`)
                    plc.tell("********************")
                })
            })
        }
    })
}