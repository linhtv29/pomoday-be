const express = require("express");
const app = express();
const connectDB = require("./helpers/dbConnection");
const tasks = require('./routes/tasks')
const authRouter = require('./routes/auth')
const authentication = require('./middleware/authentication')
require('dotenv').config();

app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/tasks', authentication, tasks)
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