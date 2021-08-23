const fs = require('fs');
const path = require('path');
const amqp = require('amqplib/callback_api');

const QUEUE_NAME = 'hello';

function processFile(filePath, channel) {
  if (!fs.existsSync(filePath)) {
    console.log("File does not exist: " + filePath);
  }

  console.log(`processing file: ${filePath}`)
  const data = fs.readFileSync(filePath).toString();
  data.trim().split('\n').map(e => {
    const obj = {path: filePath, line: e};
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify({obj})));
    console.log(" [x] Sent %s", JSON.stringify({obj}));
  });
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
      channel.assertQueue(QUEUE_NAME, {
        durable: false
      });

      fs.watch(process.env.INPUT_DIR, (eType, fileName) => {
        if (eType === 'rename') {
          processFile(path.join(process.env.INPUT_DIR, fileName), channel);
        }
      })
    });
  });
}