//LiteLoaderScript Dev Helper
/// <reference path="d:\LateralCircle83\object/dts/llaids/src/index.d.ts"/> 

ll.registerPlugin(
    /* name */ "eval",
    /* introduction */ "只是在eval罢了",
    /* version */[0, 3, 0],
    /* otherInformation */ {}
);

//因为没有remove函数于是搞了个低配版
function remove(the_array_, the_num) {
    //设立空数组
    let path = []
    //循环
    for (var i = 0, len = the_array_.length; i < len; i++) {
        //取对应值
        let path_two = the_array_[i]
        // 判断与其是否相同
        if (path_two == the_num) {
            continue
        } else {
            path.push(path_two)
        }
    }
    return path
}
colorLog("cyan", "正在挂载")
var pullupdate = new JsonConfigFile('.\\plugins\\evaldate.json', '{ "all_ids": [] }')
colorLog("cyan", "初始化挂起数据")
pullupdatestaring()
//挂载命令
var command = mc.newCommand("runllseval", "加载llse语句")
command.setAlias("eval")
command.setEnum("enummode", ["pullup"])
command.setEnum("runrun", ["run"])
command.mandatory("mode", ParamType.Enum, "enummode")
command.mandatory("rruunn", ParamType.Enum, "runrun")
command.mandatory("main", ParamType.String)
command.mandatory("nid", ParamType.String)
command.setEnum("mode_two_s", ["list"])
command.setEnum("mode_three_s", ["remove", "find"])
command.setEnum("mode_four_s", ["toplayer", "toentity"])
command.mandatory("mode_two", ParamType.Enum, "mode_two_s")
command.mandatory("mode_three", ParamType.Enum, "mode_three_s")
command.optional("mode_four", ParamType.Enum, "mode_four_s")
command.optional("to_shiti", ParamType.Actor)
command.overload(["rruunn", "main", "mode_four", "to_shiti"])
command.overload(["rruunn", "main", "mode", "nid"])
command.overload(["mode_two"])
command.overload(["mode_three", "nid"])
command.setCallback(callback)
command.setup()
//满级回调
function callback(_cmd, _origin, output, res) {
    //log(res)
    //log(origin)
    //log(origin.type)
    //判断主体是否挂起
    if (res.mode == null) {
        //不挂起
        //是否使用功能
        switch (res.mode_two) {
            //判断list功能
            case "list":
                //使用list
                output.success("[eval]存在的挂起id如下：" + String(pullupdate.get("all_ids")))
                break
            default:
                //没有使用list
                switch (res.mode_three) {
                    //检测remove与find
                    case "remove":
                        if (pullupdate.get(res.nid) != null) {
                            //存在
                            let get_with_id_list = pullupdate.get("all_ids")
                            pullupdate.delete(res.nid)
                            //删除主要与次要
                            pullupdate.set("all_ids", remove(get_with_id_list, res.nid))
                            output.success("[eval]成功删除此挂起")
                        } else { output.error("[eval]不存在此挂起id") }
                        break
                    case "find":
                        if (pullupdate.get(res.nid) != null) {
                            output.success("[eval]" + res.nid + "详细信息:" + pullupdate.get(res.nid))
                        } else {
                            output.error("[eval]不存在此挂起id")
                        }
                        break
                    default:
                        running(res, output)
                }
        }
        //running(res, output)
    }
    else {
        let test_for_in_date = pullupdate.get(res.nid)
        if (test_for_in_date == null) {
            //没有被占用的挂起
            output.success("收到")
            //运行
            ll.eval(res.main)
            let tawaluduo = pullupdate.get("all_ids")
            tawaluduo.push(res.nid)
            pullupdate.set("all_ids", tawaluduo)
            //log(res.nid)
            switch (pullupdate.set(res.nid, res.main)) {
                //写入挂起档案
                case true:
                    //成功
                    output.success("success")
                    break
                case false:
                    //失败
                    output.error("bad")
                    break
            }
        } else {
            //被占用
            output.addMessage("[eval]此命令已经挂起，您将不用进行操作（注意检查是否有两个相同的挂起id，否则命令将不会启用）")
        }
    }
}
//需要挂起,检测是否已被占用nid
/*let test_for_in_date = pullupdate.get(res.nid)
if (test_for_in_date == null) {
    //没有被占用的挂起
    output.success("收到")
    //运行
    ll.eval(res.main)
    switch (pullupdate.set(res.nid, res.main)) {
        //写入挂起档案
        case true:
            //成功
            output.success("success")
            break
        case false:
            //失败
            output.error("bad")
            break
    }
} else {
    //被占用
    output.addMessage("[eval]此命令已经挂起，您将不用进行操作（注意检查是否有两个相同的挂起id，否则命令将不会启用）")
}*/
//不挂起的命令执行体
function running(res, output) {
    switch (res.mode_four) {
        case "toplayer":
            var player_list = res.to_shiti
            //log(player_list)
            if (player_list != null) {
                if (player_list[0] != null) {
                    let command_of_the_world = res.main
                    for (var i = 0, len = player_list.length; i < len; i++) {
                        let playera = player_list[i].toPlayer().uniqueId
                        ll.eval(`player = mc.getPlayer("${playera}");${command_of_the_world}`)
                    }
                    output.success("[eval]这玩意已执行，成不成功无所谓")
                } else { output.addMessage("[eval]没找到对象") }
                /*let command_of_the_world = res.main
                for(var i = 0, len = player_list.length; i < len; i++){
                    let player = player_list[i]
                    ll.eval(command_of_the_world)
                }*/
            } else { output.error("[eval]你在逗我吗") }
            break
        case "toentity":
            var entity_list = res.to_shiti
            if (entity_list != null) {
                if (entity_list[0] != null) {
                    let command_of_the_world = res.main
                    for (var i = 0, len = entity_list.length; i < len; i++) {
                        let entity = entity_list[i].uniqueId
                        ll.eval(`all_entity=mc.getAllEntities();for(var i=0,len=all_entity.length;i<len;i++){if(all_entity[i].uniqueId=="${entity}"){entity=all_entity[i];${command_of_the_world}}else{continue}}`)
                    }
                    output.success("[eval]这玩意已执行，成不成功无所谓")
                } else { output.addMessage("[eval]没找到对象") }
            } else { output.error("[eval]你在逗我吗") }
            break
        default:
            ll.eval(res.main)
            output.success("[eval]这玩意已执行，成不成功无所谓")
    }
    //log(res.to_shiti)
    //ll.eval(res.main)
    //output.success("[eval]这玩意已执行，成不成功无所谓")
}

//ll.eval(res.main)
//      output.success("success")
//命令初始挂起
function pullupdatestaring() {
    // 获取全部id[]值
    let togettheallids = pullupdate.get("all_ids")
    //判断是否存在id
    if (togettheallids.length != 0) {
        //存在遍历取id——name
        for (var i = 0, thelennum = togettheallids.length; i < thelennum; i++) {
            //获取对应id——name的本体
            let the_command_of_date = pullupdate.get(togettheallids[i])
            //执行
            ll.eval(the_command_of_date)
            //输出
            colorLog("yellow", `已挂载id为${togettheallids[i]}的命令`)
        }
    } else { colorLog("yellow", `没有需要挂载的命令`) }
}