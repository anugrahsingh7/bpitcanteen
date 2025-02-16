const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("./controllers/authPassport");
const connectDb = require("./db");
const multer = require("multer");
const ImageKit = require("imagekit");
const app = express();
const menuRouter = require("./routes/menuRoute");
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/authRoute");
const orderRouter = require("./routes/orderRoute");
const vendorRouter = require("./routes/vendorRoute");
connectDb();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174","https://bpitcanteen.vercel.app"], // ✅ Set to frontend URL
    credentials: true, // ✅ Allow cookies & authorization headers
    methods: ["GET", "POST", "PATCH", "DELETE"], // ✅ Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allowed headers
  })
);



app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());
app.use("/api/menu", menuRouter);
app.use("/api/users", userRouter);
app.use("/auth", authRouter);
app.use("/api/order", orderRouter);
app.use("/api/vendor", vendorRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
