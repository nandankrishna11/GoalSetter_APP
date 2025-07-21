const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const PORT = process.env.PORT || 5000;

connectDB();
const app = express();

// Security Middleware
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(mongoSanitize());

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(PORT, () => console.log(`server started at port ${PORT}`));