/**
 * GET /
 * Home page.
 */

export function index(req, res) {
  res.render('home', {
    title: 'Home',
  });
}

export function welcome(req, res) {
  res.render('welcome');
}
