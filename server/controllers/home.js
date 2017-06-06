/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
  res.render('home', {
    title: 'Home',
  });
};

exports.welcome = function(req, res) {
  res.render('welcome');
};
