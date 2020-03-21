import { subscriptionTopicMapping } from './subscriptionTopicMapping';
import { GraphbackOperationType} from "@graphback/core"

export const kafka_subscribe=(pubSub,publishConfig)=>{
    var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.KafkaClient(),
    consumer = new Consumer(
        client,
        [
            { topic: 'dbserver2.studentData.student', partition: 0 },
            // { topic: 'dbserver2.studentData.parents', partition: 0 }
    
        ],
        {
            autoCommit: false
        }
    );
    consumer.on('message', function (message) {
        const json = JSON.parse(message.value);
        if(json!==null&& json.payload.source.table==="student"){
            if(json.payload.before===null){
                if(json.payload.after!==null){
                    console.log("new element added");
                    create(pubSub,publishConfig,json.payload.after);
                }
            }else if(json.payload.after===null){
                console.log("element deleted")
                deletes(pubSub,publishConfig,json.payload.before);
            }else{
                update(pubSub,publishConfig,json.payload.after);
            }   
        }
        // console.log(json);
    });
}


const fun=()=>{
  console.log("sdfsffsf")
}

const create=async(pubSub:any,publishConfig:any,data: any) =>{
    console.log(`Creating object ${"student"} haha`);
    
    if (pubSub && publishConfig.publishCreate) {
        const topic = subscriptionTopicMapping(GraphbackOperationType.CREATE, "Student");
        //TODO use subscription name mapping 
        const payload = buildEventPayload('new', data);
        await pubSub.publish(topic, payload);
    }
}

const update=async(pubSub:any,publishConfig:any,data: any)=> {
    console.log(`Updating object Student`)
    // console.log(data);

    if (pubSub && publishConfig.publishUpdate) {
        const topic = subscriptionTopicMapping(GraphbackOperationType.UPDATE, "Student");
        //TODO use subscription name mapping 
        const payload = buildEventPayload('updated', data);
        // console.log(topic)
        console.log(payload)
        await pubSub.publish(topic, payload);
    }
}

//tslint:disable-next-line: no-reserved-keywords
const deletes=async(pubSub:any,publishConfig:any,data:any)=> {
    console.log(`deleting object ${"Student"}`)
    
    if (pubSub && publishConfig.publishUpdate) {
        const topic = subscriptionTopicMapping(GraphbackOperationType.DELETE, "Student");
        const payload = buildEventPayload('deleted', data);
        await pubSub.publish(topic, payload);
    }

}

const buildEventPayload=(action: string, result: any)=> {
    const payload = {};
    payload[`${action}${"Student"}`] = result;
    // console.log(payload)
    return payload;
}