const log4js = require("log4js");
const logger = log4js.getLogger();
const fs = require("fs");

const file_config="config.ini";
const delay = ms => new Promise(res => setTimeout(res, ms));

var config={
  "key_memory1":"M1",
  "key_memory2":"M2",
  "ip_plc":"127.0.0.1",
  "time_plc_reconnect":10000, 
  "logger":{
    "appenders": {
      "everything": {
        "type": "file",                
        "layout":{
            "type": "pattern",
            "pattern": "[%d] [%5.5p] %m%n"
        }
      }
    },
    "categories": {
      "default": { "appenders": [ "everything"], "level": "ALL" }
    }
  }
}
let error_config_load='';
try {
  let config_from_file=JSON.parse(fs.readFileSync(file_config, "utf8"));    
  if(config_from_file.pattern){
    config.logger.appenders.everything.layout.pattern=config_from_file.pattern;
  }
  if(config_from_file.key_memory1){
    config.key_memory1=config_from_file.key_memory1;
  }
  if(config_from_file.key_memory2){
    config.key_memory2=config_from_file.key_memory2;
  }
  if(config_from_file.ip_plc){
    config.ip_plc=config_from_file.ip_plc;
  }
  if(config_from_file.time_plc_reconnect){
    config.time_plc_reconnect=config_from_file.time_plc_reconnect;
  }
} catch (e) {
  error_config_load=e;  
}
function setLoggerFile(){
  var d = new Date(); var d = new Date();
  // var file_log4js = d.getFullYear()+ "_" + ("0"+(d.getMonth()+1)).slice(-2) + "_" +("0" + d.getDate()).slice(-2)  
  // +"_" + ("0" + d.getHours()).slice(-2) + "_" + ("0" + d.getMinutes()).slice(-2)+ "_" + ("0" + d.getSeconds()).slice(-2);
  var file_log4js = d.getFullYear()+ "/" + ("0"+(d.getMonth()+1)).slice(-2) + "/" +("0" + d.getDate()).slice(-2);
  config.logger.appenders.everything.filename="logs/"+file_log4js+".log";
  log4js.configure(config.logger);
}
setLoggerFile();
if(!error_config_load){
  logger.info('Configuration file('+file_config+') loaded. ');
}
else{
  logger.info('Configuration file('+file_config+') Failed to loaded. '+error_config_load);  
}
logger.info(config);
// async function start() {
//   setLoggerFile();
//   logger.trace("Entering cheese testing");
//   await delay(2000);
//   setLoggerFile();
//   logger.error("Cheese is too ripe!");

// }
// start();
