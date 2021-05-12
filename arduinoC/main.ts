
enum SIZE {
    //% block="29*29"
    1,
    //% block="58*58"
    2
}

enum LINE {
    //% block="1"
    1,
    //% block="2"
    2,
    //% block="3"
    3,
    //% block="4"
    4
}



//% color="#AA278D" iconWidth=50 iconHeight=40
namespace MQTT {

    //% block="连接WIFI[SSID],密码[password]" blockType=" command"
    //% SSID.shadow="string"
    //% password.shadow="string"
    export function WIFIInit(parameter: any, block: any) {
        let SSID = parameter.SSID.code;
        let password = parameter.password.code;
        Generator.addInclude("WIFI_1","#include <WiFi.h>");
        Generator.addObject("WIFI_3","WiFiClient",`espClient;`);
        Generator.addSetup("WIFI_5",`WiFi.mode(WIFI_STA);`);
        Generator.addSetup("WIFI_6",`WiFi.begin(${SSID}, ${password});`);
        //Generator.addCode(`;`);
    }

    //% block="WIFI连接成功？" blockType="boolean"
    export function WIFIreconnect(parameter: any, block: any) {
        Generator.addCode(`(WiFi.status() != WL_CONNECTED)`);
    }

    //% block="MQTT服务器初始化，服务器IP[mqtt_server],ID[ID]" blockType=" command"
    //% mqtt_server.shadow="string"
    //% ID.shadow="string"
    export function MQTTInit(parameter: any, block: any) {
        let mqtt_server = parameter.mqtt_server.code;
        let ID = parameter.ID.code;
        Generator.addInclude("MQTT_1","#include <PubSubClient.h>");
        Generator.addObject("MQTT_3","PubSubClient",`client(espClient);`);
        Generator.addSetup("MQTT_5",`client.setServer(${mqtt_server}, 1883);`);
        Generator.addCode(`client.connect(${ID});`);
        Generator.addCode(`while (!client.connected()) {
            Serial.print("Attempting MQTT connection...");
            // Create a random client ID
            // Attempt to connect
            if (client.connect(${ID})) {
              Serial.println("connected");
            } else {
              Serial.print("failed, rc=");
              Serial.print(client.state());
              Serial.println(" try again in 5 seconds");
              // Wait 5 seconds before retrying
              delay(5000);
            }
          }`);
        //Generator.addEvent("MQTT_6", "callback", "function", "")
       // Generator.addSetup("MQTT_7",` client.setCallback(callback);`);
        //Generator.addCode(`client.loop();`);
    }


    //% block="订阅TOPIC[S_TOPIC]" blockType="command"
    //% S_TOPIC.shadow="string" 
    export function subscribe(parameter: any, block: any) {
        let s_topic = parameter.S_TOPIC.code
        Generator.addSetup(`MQTT_8`, `client.subscribe(${s_topic});`);
    }


    //% block="向TOPIC[P_TOPIC]发送[MSG]" blockType="command"
    //% TPOIC.shadow="string" 
    //% MSG.shadow="string"
    export function publish(parameter: any, block: any) {
        let p_topic = parameter.P_TOPIC.code
        let MSG = parameter.MSG.code
        Generator.addCode(`client.loop();`);
        Generator.addCode(`client.publish(${p_topic},${MSG});`);
    }

    //% block="当收到来自TOPIC[S_TOPIC]的消息[mag]" blockType="hat"
    //% S_TOPIC.shadow="string"
    export function subscribe(parameter: any, block: any) {
        let s_topic = parameter.S_TOPIC.code
        Generator.addEvent("addEvent", "void", "callback", "String& message");
        Generator.addCode(`client.setCallback(callback);`);
    }




}
