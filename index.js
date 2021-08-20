const recv = require('./recv');
const send = require('./send');

if (process.argv.length > 2){
    if (process.argv[2] === "send") {
        send(process.argv.slice(3));
    } else {
        recv(process.argv.slice(3));
    }
}