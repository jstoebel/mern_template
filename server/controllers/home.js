import path from 'path'
import underscore from 'underscore'
import mongoose from 'mongoose'

/**
* GET /
* Home page.
*/
export function index(req, res) {
  res.sendFile(path.join(__dirname + '/../../public/build/index.html'))
}
