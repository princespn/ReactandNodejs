import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import cors from "cors";  // Added CORS middleware
import routes from "./routes/users";
import categories from "./routes/categories";
import products from "./routes/products";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

const connectWithRetry = () => {
    mongoose.connect(MONGOURL as string)
        .then(() => {
            console.log('Database connected');
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        })
        .catch((error) => {
            console.error('Database connection error:', error);
            setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds
        });
};

if (!MONGOURL) {
    console.error("MONGO_URL is not defined in the environment variables");
    process.exit(1);
}

connectWithRetry();

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3000',  // Allow requests from React frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization']  // Allowed headers
}));

// Express session middleware
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());
// Middleware to parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);
app.use('/api/categories', categories);
app.use('/api/products', products);

export default app;
