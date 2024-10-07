const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/database`);

const userSchema = mongoose.Schema({
 name: String,
 email: String,
 url: String,
});

let user = mongoose.model("user", userSchema);
module.exports = user;
