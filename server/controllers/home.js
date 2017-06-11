/**
 * GET /
 * Home page.
 */
const path = require('path');

export function index(req, res) {
  console.log('responding with home#index');
  res.sendFile(path.join(__dirname + '/../../public/build/index.html'))

}
