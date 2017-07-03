let User = require('../server/models/User')

let fg = require('factory-girl');
let adapter = new fg.MongooseAdapter();

let factory = fg.factory;
factory.setAdapter(adapter);

factory.define('user', User, {
  email: factory.sequence('User.email', (n) => `email_${n}@demo.com`),
  password: '123',
  profile: {
    firstName: 'Jacob',
    lastName: 'Stoebel'
  },
  role: 'Member'

});


module.exports = factory;
