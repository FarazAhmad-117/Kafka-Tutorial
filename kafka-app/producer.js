const { kafka } = require('./client');
const readline = require('readline');

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});


async function init(){
    const producer = kafka.producer();
    console.log('Producer Connecting...');
    await producer.connect();
    console.log('Producer Connected Successfully!');

    rl.setPrompt('> ');
    rl.prompt();
    rl.on('line',async (line)=>{
        if(line === "exit"){
            console.log('Disconnecting Producer')
            await producer.disconnect();
            console.log('Disconnected Producer Successfully!')
            process.exit(0);
        }
        const words = line.split(' ');
        const loc = words.pop();
        if(!['north','south'].includes(loc.toLowerCase())){
            console.log('Invalid Location was entered',loc);
            return;
        }
        const message = words.join(' ');
        await producer.send({
            topic:'rider-topic',
            messages:[
                { 
                    partition:loc.toLowerCase() === "north" ? 0 : 1,
                    key:'location-update', 
                    value:JSON.stringify({
                        message,
                        loc
                    }) },
            ]
        });
        rl.setPrompt('> ');
    }).on('close',async()=>{
        console.log('Disconnecting Producer')
        await producer.disconnect();
        console.log('Disconnected Producer Successfully!')
    })

}



init();
