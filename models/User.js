const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    require: [true, "please provide user name"],
    maxlength: 30,
    minlength: 3,
    unique: true,
  },
  // email: {
  //   type: String,
  //   required: [true, "Please provide email"],
  //   match: [
  //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  //     "Please provide a valid email",
  //   ],
  //   unique: true,
  // },
	password: {
		type: String,
    required: [true, "Please provide password"],
		minlength: 6
	}
});

UserSchema.pre('save', async function () {
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
	return jwt.sign(
		{userId: this._id, userName: this.userName},
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_LIFETIME}
	)
}

UserSchema.methods.comparePassword = function (inputPass) {
	const isMatch = bcrypt.compare(inputPass, this.password)
	return isMatch
}

module.exports = mongoose.model('User', UserSchema)