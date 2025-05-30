import express from 'express';
import dotenv from 'dotenv';
import connectDb from './utils/db.js';
import cloudinary from 'cloudinary';
import cors from "cors";
import axois from "axios";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

const url = `https://vistora-backend-2.onrender.com`;
const interval = 30000;

function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log("website reloded");
    })
    .catch((error) => {
      console.error(`Error : ${error.message}`);
    });
}

setInterval(reloadWebsite, interval);

app.use(express.json());
app.use(cors())


const PORT = process.env.PORT;


// importing routes
import userRoutes from './routes/user.js';
import productRoutes from './routes/product.js';
import cartRoutes from './routes/Cart.js';
import addressRoutes from './routes/Address.js';
import orderRoutes from './routes/Order.js';


// using routes

app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);

app.listen(PORT,() => {
    console.log(`Server is running on port http://localhost:${PORT}`)
    connectDb();
});
