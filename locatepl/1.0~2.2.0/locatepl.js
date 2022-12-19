log("locatepl正在加载")
load()
function locate() {
	var fm = mc.newSimpleForm()
	fm.setTitle("§8l§9o§ac§ba§ct§de§ep§fl§k窗§l口")
    fm.setContent("§e§l选择一个要查找的类型§4(注意你所在的维度)")
	fm.setContent("§2§l在主世界：")
	fm.addButton("§1埋藏的宝藏","https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/c/c8/Chest_JE2_BE3.png/revision/latest/scale-to-width-down/120?cb=20190402044441")
    fm.addButton("§2林地府邸","https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/5/5d/Woodland_Mansion.png/revision/latest/scale-to-width-down/290?cb=20200824075325")
    fm.addButton("§3废弃矿井","https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/5/52/Mineshaft.png/revision/latest/scale-to-width-down/250?cb=20210711033604")
    fm.addButton("§4海底神殿","https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/2/2c/Ocean_monument.png/revision/latest/scale-to-width-down/200?cb=20201023041053")
    fm.addButton("§5海底废墟","https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/0/02/Underwater_ruin_cold.png/revision/latest/scale-to-width-down/275?cb=20180616144141")
    fm.addButton("§6沉船","https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/e/e8/Shipwreck_Jungle_%28With_Mast%29.png/revision/latest/scale-to-width-down/250?cb=20190824103109")
    fm.addButton("§7要塞","https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/a/ae/StrongholdPortalRoom.png/revision/latest/scale-to-width-down/250?cb=20210608015800")
    fm.addButton("§8temple","https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/5/54/EnvCSS.png/revision/latest?cb=20210120043415&format=original")
    fm.addButton("§9村庄","https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/0/01/Plains_Small_House_3.png/revision/latest/scale-to-width-down/250?cb=20190525104337")
    fm.addButton("§a掠夺者前哨站","https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/8/8c/Pillager_outpost_watchtower.png/revision/latest/scale-to-width-down/250?cb=20190206115724")
	fm.setContent("§b在地域：")
	fm.addButton("§c下界要塞","https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/c/cb/Nether_Fortress.png/revision/latest/scale-to-width-down/250?cb=20210508142956")
    fm.addButton("§d下界化石","https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/4/4a/Nether_fossil_9.png/revision/latest/scale-to-width-down/145?cb=20200328064824")
    fm.addButton("§e堡垒遗迹","https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/2/26/Bastion_Remnant_2.png/revision/latest/scale-to-width-down/250?cb=20200422100411")
    fm.addButton("§f废弃传送门","https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/a/a1/Overworld_Ruined_Portal_1.png/revision/latest/scale-to-width-down/250?cb=20210715104633")
	fm.setContent("§g在末地：")
    fm.addButton("§0末地城","https://static.wikia.nocookie.net/minecraft_zh_gamepedia/images/d/d8/EndCityEntrance.png/revision/latest/scale-to-width-down/250?cb=20190829020145")
    return fm
}
function tickon(pl,cnm) {
	if(cnm != null) {
		if(cnm == 0) {
			var one = mc.runcmdEx("execute " + pl.name + " ~ ~ ~ locate buriedtreasure")
	        var ones = one.output.match(/(\-|\+)?\d+(\.\d+)?/g)
	        pl.tell("§1埋藏的宝藏的坐标是[" + ones + "]")
			pl.tell(one.output)
			return
		}
		if(cnm == 14) {
			var one = mc.runcmdEx("execute " + pl.name + " ~ ~ ~ locate endcity")
			var ones = one.output.match(/(\-|\+)?\d+(\.\d+)?/g)
			pl.tell("§2末地城的坐标是[" + ones + "]")
			pl.tell(one.output)
			return
		}
		if(cnm == 10) {
			var one = mc.runcmdEx("execute " + pl.name + " ~ ~ ~ locate fortress")
			var ones = one.output.match(/(\-|\+)?\d+(\.\d+)?/g)
			pl.tell("§3下界要塞的坐标是[" + ones + "]")
			pl.tell(one.output)
			return
		}
		if(cnm == 1) {
			var one = mc.runcmdEx("execute " + pl.name + " ~ ~ ~ locate mansion")
			var ones = one.output.match(/(\-|\+)?\d+(\.\d+)?/g)
			pl.tell("§5林地府邸的坐标是[" + ones + "]")
			pl.tell(one.output)
			return
		}
		if(cnm == 2) {
			var one = mc.runcmdEx("execute " + pl.name + " ~ ~ ~ locate mineshaft")
			var ones = one.output.match(/(\-|\+)?\d+(\.\d+)?/g)
			pl.tell("§6废弃矿井的坐标是[" + ones + "]")
			pl.tell(one.output)
			return
		}
		if(cnm == 3) {
			var one = mc.runcmdEx("execute " + pl.name + " ~ ~ ~ locate monument")
			var ones = one.output.match(/(\-|\+)?\d+(\.\d+)?/g)
			pl.tell("§7海底神殿的坐标是[" + ones + "]")
			pl.tell(one.output)
			return
		}
		if(cnm == 4) {
			var one = mc.runcmdEx("execute " + pl.name + " ~ ~ ~ locate ruins")
			var ones = one.output.match(/(\-|\+)?\d+(\.\d+)?/g)
			pl.tell("§8海底废墟的坐标是[" + ones + "]")
			pl.tell(one.output)
			return
		}
		if(cnm == 5) {
			var one = mc.runcmdEx("execute " + pl.name + " ~ ~ ~ locate shipwreck")
			var ones = one.output.match(/(\-|\+)?\d+(\.\d+)?/g)
			pl.tell("§9沉船的坐标是[" + ones + "]")
			pl.tell(one.output)
			return
		}
		if(cnm == 6) {
			var one = mc.runcmdEx("execute " + pl.name + " ~ ~ ~ locate stronghold")
			var ones = one.output.match(/(\-|\+)?\d+(\.\d+)?/g)
			pl.tell("§a要塞的坐标是[" + ones + "]")
			pl.tell(one.output)
			return
		}
		if(cnm == 7) {
			var one = mc.runcmdEx("execute " + pl.name + " ~ ~ ~ locate temple")
			var ones = one.output.match(/(\-|\+)?\d+(\.\d+)?/g)
			pl.tell("§btemple的坐标是[" + ones + "]")
			pl.tell(one.output)
			return
		}
		if(cnm == 8) {
			var one = mc.runcmdEx("execute " + pl.name + " ~ ~ ~ locate village")
			var ones = one.output.match(/(\-|\+)?\d+(\.\d+)?/g)
			pl.tell("§c村庄的坐标是[" + ones + "]")
			pl.tell(one.output)
			return
		}
		if(cnm == 9) {
			var one = mc.runcmdEx("execute " + pl.name + " ~ ~ ~ locate pillageroutpost")
			var ones = one.output.match(/(\-|\+)?\d+(\.\d+)?/g)
			pl.tell("§d掠夺者前哨站的坐标是[" + ones + "]")
			pl.tell(one.output)
			return
		}
		if(cnm == 11) {
			var one = mc.runcmdEx("execute " + pl.name + " ~ ~ ~ locate N/A")
			var ones = one.output.match(/(\-|\+)?\d+(\.\d+)?/g)
			pl.tell("§e下界化石的坐标是想屁吃")
			pl.tell(one.output)
			return
		}
		if(cnm == 12) {
			var one = mc.runcmdEx("execute " + pl.name + " ~ ~ ~ locate bastionremnant")
			var ones = one.output.match(/(\-|\+)?\d+(\.\d+)?/g)
			pl.tell("§f堡垒遗迹的坐标是[" + ones + "]")
			pl.tell(one.output)
			return
		}
		if(cnm == 13) {
			var one = mc.runcmdEx("execute " + pl.name + " ~ ~ ~ locate ruinedportal")
			var ones = one.output.match(/(\-|\+)?\d+(\.\d+)?/g)
			pl.tell("§g废弃传送门的坐标是[" + ones + "]")
			pl.tell(one.output)
			return
		}
	}
}
function load() {
	mc.regPlayerCmd("locatepl","§o§a查看最近的生成建筑",function (pl,are) {
		pl.sendForm(locate(),tickon)
	})
}