const express = require("express");
const app = express();
const connectDB = require("./helpers/dbConnection");
const tasks = require('./api/tasks')
require('dotenv').config();

app.use(express.json())
app.use('/tasks', tasks)
const PORT = process.env.PORT || 8080;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start()