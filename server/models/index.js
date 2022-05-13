const mongoose = require('mongoose');
const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.note = require("./notes.model");
module.exports = db;