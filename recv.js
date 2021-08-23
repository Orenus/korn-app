const amqp = require('amqplib/callback_api');

function processMessage(msg) {

}

module.exports = function run(argvRest) {
  amqp.connect(process.env.MQ_URL || 'amqp://localhost', function(error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }
      var queue = 'hello';

      channel.assertQueue(queue, {
        durable: false
      });

      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
      channel.consume(queue, function(msg) {
        const message = JSON.parse(msg.content.toString());
        console.log(" [x] Received: %s", JSON.stringify(message, null, 2));

      }, 
      {
          noAck: true
      });
      });
  });
}