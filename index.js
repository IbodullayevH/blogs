const express = require(`express`);
const mongo = require("./src/config/mongoose");
const mainRout = require("./src/routes/mainRout");
const app = express();
require(`dotenv`).config();

app.use(express.json());

// mongoose
mongo()
  .then(() => {
    console.log(`MongoDB connected`);
  })
  .catch((err) => console.log(`index.js file:MongoDB connection error${err}`));

// rout
app.use(mainRout);

// server run
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Port ${port}: Server is run`);
});
