var models = require('require.all')('../models')
var fg = require('factory-girl');

var adapter = new fg.MongooseAdapter();
var factory = fg.factory
factory.setAdapter(adapter);

factory.define('user', models.User, {
  email: factory.sequence('User.email', (n) => `email_${n}@demo.com`),
  password: '123',

});


module.exports = factory;
