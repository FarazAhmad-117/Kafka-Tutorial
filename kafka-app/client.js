const { Kafka } = require("kafkajs");


exports.kafka = new Kafka({
    clientId:'kafka-app',
    brokers:['192.168.0.117:9092'], // The kafka service running up
    requestTimeout: 60000
})





