var container = require('rhea');
const {Client, Pool} = require('pg');

// Connection details
const connectionOptions = {
  host: '129.40.98.9',
  port: '9090',
  username: 'admin',
  password: 'admin',
};

const client = new Client({
  host: '129.40.75.145',
  user: 'postgres',
  password: 'mynewpassword',
  database: 'postgres',
})

// Define the AMQP address (queue or topic) you want to consume from
const address = 'DLQ'; // Replace with the actual queue or topic name
var connection = container.connect(connectionOptions);

client.connect((err) => {
  if (err) {
    throw err
  }

  console.log('Connected to database');
  connection.open_receiver(address);
});

container.on('message', function (context) {
    // console.log(context.message.body);
    generateQuery(context.message.body);
    // context.connection.close();
});

const generateQuery = function(msg) {
  if (msg) {
    let msgDetails = msg.split(',');
    let balance = 10000;
    const query = `INSERT INTO ACCOUNTS(acc_id, user_id, bank_id, cif, acc_type_id, balance) VALUES(nextval('accounts_acc_id_seq'), ${msgDetails[0]}, ${msgDetails[1]}, ${msgDetails[2]}, ${msgDetails[3]}, ${balance});`

    client.query(query, (err, row) => {
      if (err) {
        console.error('Error Inserting:');
      } else {
        console.log('Created account:');
      }
    })


  }
}
// connection.open_sender(address);
