const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require("./config/db");

const authRoute = require('./Routes/userRoutes');
const categoryRoutes = require('./Routes/CategoryRoutes.js');
const productRoutes = require('./Routes/productRoutes.js');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ✅ CORS Configuration
const corsOptions = {
    origin: "https://front-end-eight-opal.vercel.app", // frontend domain
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

// ✅ Middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handles preflight requests

app.use(express.json());
app.use(morgan('dev'));

// ✅ Routes
app.use("/api/auth", authRoute);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);

// ✅ Test Route
app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to BuildSmart API!',
    });
});

// ✅ Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
