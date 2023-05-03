const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
// const port = process.env.PORT || 3006;
dotenv.config();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((db) => db.connection.readyState)
  .then(() => console.log("Database Connected"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth/", require("./routes/authRoute"));
app.use("/api/tariff/", require("./routes/tariffRoute"));
app.use("/api/comments/", require("./routes/commentRoute"));
app.use("/api/orders/", require("./routes/bookingRoute"));

app.get("/", (req, res) => res.send("Server Running"));

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });

module.exports = app;

git commit -m "Lambda to MongoDB Fix, Added Body Parser"