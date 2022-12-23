const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
// const port = process.env.PORT || 3006;
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors());

app.use("/api/auth/", require("./routes/authRoute"));
app.use("/api/tariff/", require("./routes/tariffRoute"));
app.use("/api/comments/", require("./routes/commentRoute"));
app.use("/api/orders/", require("./routes/bookingRoute"));

app.get("/", (req, res) => res.send("Server Running"));

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });

module.exports = app;
