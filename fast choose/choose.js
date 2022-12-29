ll.export((way,main)=>{
    mc.runcmd("lltest "+way+" "+main)
    return c
},"ch","ch")
var c
var cmd=mc.newCommand("lltest","选择器转对象",PermType.Console)
cmd.setEnum("p",["player"])
cmd.setEnum("e",["enitiy"])
cmd.setEnum("po",["pos"])
cmd.mandatory("set",ParamType.Enum,"p")
cmd.mandatory("set",ParamType.Enum,"e")
cmd.mandatory("set",ParamType.Enum,"po")
cmd.mandatory("pl",ParamType.Player)
cmd.mandatory("en",ParamType.Actor)
cmd.mandatory("pos",ParamType.Float)
cmd.overload(["p","pl"])
cmd.overload(["e","en"])
cmd.overload(["po","pos"])
cmd.setCallback((_cmd,_o,_output,res)=>{
    switch(res.set){
        case "player":
            c=res.pl
            break
        case "enitiy":
            c=res.en
            break
        case "pos":
            c=res.pos
            break
        }
    return res
})
cmd.setup()