const mongoose = require("mongoose");

const connectDB = (atlasURI) => {
  return mongoose.connect(atlasURI, {
    useNewUrlParser: true,
    useCreateIndex: false,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
