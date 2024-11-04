import express from 'express';
import connectDB from './config/config.js'; // MongoDB connection
import cors from 'cors'; // User services for phone validation
import  userRoutes from "./routes/userRoutes.js"
import  foodSellerRoutes from "./routes/foodSellerRoutes.js"
import  retailSellerRoute from "./routes/retailSellerRoutes.js"
import  admin from "./routes/adminRoutes.js"
import  servicesTakenByAllRole from "./routes/globalRoutes.js"







connectDB();
const app = express();
app.use(express.json());
app.use(cors());


// Static route to serve uploaded files
app.use('/uploads', express.static('uploads')); 

app.get('/', (req, res) => {
  res.send('Hello World!'); // Test endpoint
});

// User authentication routes

app.use('/user', userRoutes);
app.use('/retail', retailSellerRoute);
app.use('/food', foodSellerRoutes);
app.use('/admin', admin);
app.use('/global', servicesTakenByAllRole);










// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
