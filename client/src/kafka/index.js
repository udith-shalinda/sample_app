var kafka = require('kafka-node'),
Consumer = kafka.Consumer,
client = new kafka.KafkaClient(),
consumer = new Consumer(
    client,
    [
        { topic: 'dbserver2.studentData.students', partition: 0 },
        // { topic: 'dbserver2.studentData.parents', partition: 0 }

    ],
    {
        autoCommit: false
    }
);

exports.consumer=consumer;
    