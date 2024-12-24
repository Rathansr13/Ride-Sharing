const amqp = require('amqplib');

const RABBIT_URL = process.env.RABBIT;

let connection, channel;

async function connect() {
    connection = await amqp.connect(RABBIT_URL);
    channel = await connection.createChannel();
    console.log("Connected to RabbitMq")
}

async function publishToQueue(queueName, message) {
    if (!channel) await connect();
    await channel.assertQueue(queueName); 
    channel.sendToQueue(queueName, Buffer.from(message)); 
}

async function subscribeToQueue(queueName, callback) {
    if (!channel) await connect();
    await channel.assertQueue(queueName); 
    
    channel.consume(queueName, (message) => {
        callback(message.content.toString());
        channel.ack(message); 
    });
}

module.exports = { connect, publishToQueue, subscribeToQueue };
