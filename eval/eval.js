//LiteLoaderScript Dev Helper
/// <reference path="d:\LateralCircle83\object/dts/llaids/src/index.d.ts"/> 

ll.registerPlugin(
    /* name */ "eval",
    /* introduction */ "只是在eval罢了",
    /* version */ [0,0,1],
    /* otherInformation */ {}
); 


colorLog("cyan","正在挂载")
var command =mc.newCommand("runllseval","这是一个插件")
command.setAlias("eval")
command.setEnum("enummode",["pullup"])
command.optional("mode",ParamType.Enum,"enummode")
command.mandatory("main",ParamType.String)
command.overload(["main","mode"])
command.setCallback(callback)
command.setup()
function callback (_cmd,origin,output,res) {
        switch(res.mode){
            case null:
                ll.eval(res.main)
                output.success("success")
            case "pullup":
                log(null)
        }
    
    //ll.eval(res.main)
      //      output.success("success")
}