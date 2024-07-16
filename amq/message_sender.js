var container = require('rhea');
const fs = require('fs');

// Connection details
const connectionOptions = {
  host: '129.40.82.92',
  port: '9090',
  username: 'admin',
  password: 'admin',
};

let fileData = [];

const fileName = process.argv[2];
if (!fileName) {
  console.error('Please pass file name');
  process.exit(0);
}

fs.readFile(fileName, 'utf8', (err, data) => {
  if (err) {
    console.error('Error in reading file');
    process.exit(0);
  }

  fileData = data.split(/\r?\n/) || [];
});

const address = 'DLQ'; // Replace with the actual queue or topic name

container.once('sendable', function (context) {
console.log('here');

  fileData.forEach((account) => {
    sendAccount(account, context);
  })

  context.connection.close();
});

const sendAccount = function(account, context) {
  context.sender.send({body: account});
}

var connection = container.connect(connectionOptions);
connection.open_sender(address);
