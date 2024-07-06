const { kafka } = require('./client');


async function init(){
    const admin = kafka.admin();
    console.log('Admin Connecting...');
    admin.connect();
    console.log('Admin Connected Successfully!');

    console.log('Creating topic [rider-topic]');
    await admin.createTopics({
        topics:[
            {
                topic:'rider-topic',
                numPartitions:2
            }
        ]
    });
    console.log('Created topic [rider-topic] successfully!');

    console.log('Disconnecting Admin')
    await admin.disconnect();
    console.log('Disconnected Admin Successfully!')
}



init();
