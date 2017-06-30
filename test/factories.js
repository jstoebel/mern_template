console.log("RUNNING FACTORIES");

let models = require('../server/models/index');
let fg = require('factory-girl');

let adapter = new fg.MongooseAdapter();
let factory = fg.factory;
factory.setAdapter(adapter);

factory.define('user', models.User, {
  email: factory.sequence('User.email', (n) => `email_${n}@demo.com`),
  password: '123',

});


module.exports = factory;
