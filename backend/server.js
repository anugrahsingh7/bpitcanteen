const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cors = require("cors");
const connectDb = require("./db");
const app = express();
const menuRouter = require("./routes/menuRoute");
const userRouter = require("./routes/userRoute");

connectDb();
app.use(cors());
app.use(express.json());
app.use("/api/menu", menuRouter);
app.use("/api/users", userRouter);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
