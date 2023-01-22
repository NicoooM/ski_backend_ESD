const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8000;
const connectMongo = require("./config/mongo.config");
const cors = require("cors");
const bookingRoutes = require("./src/routes/booking.routes");
const postRoutes = require("./src/routes/post.routes");
const commentRoutes = require("./src/routes/comment.routes");
const shopRoutes = require("./src/routes/shop.routes");

connectMongo();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(bookingRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(shopRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
