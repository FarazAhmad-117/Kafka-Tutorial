const { kafka } = require('./client');


async function init(){
    const consumer = kafka.consumer({groupId: 'user-1'});
    console.log('Consumer Connecting...');
    await consumer.connect();
    console.log('Consumer Connected Successfully!');

    console.log('Subscribing topic [rider-topic]');
    await consumer.subscribe({topics:['rider-topic'], fromBeginning:true});
    console.log('Subscribed [rider-topic] successfully!');

    await consumer.run({
        eachMessage: async ({topic, partition, message, heartbeat, pause})=>{
            console.log(`[${topic}]:PART:${partition}==>> ${message.key.toString()}:${message.value.toString()} `)
        }
    })
}


init();
