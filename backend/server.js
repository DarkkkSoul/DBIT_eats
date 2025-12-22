import express from 'express'
import authRouter from './routes/auth.route.js';
import connectToDb from './database/connectToDb.js';
import dotenv from 'dotenv'
import cafeFoodRouter from './routes/cafeFood.route.js';
import canteenFoodRouter from './routes/canteenFood.route.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cors from 'cors'
import cartRouter from './routes/cart.route.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

// middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/cafeteria', cafeFoodRouter);
app.use('/api/v1/canteen', canteenFoodRouter);
app.use('/api/v1/cart', cartRouter);

// error handling
app.use(errorMiddleware);


app.get('/', (req, res) => {
    res.send('<h2>Welcome to the backend of Foobia</h2>')
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`App running on - http://localhost:${port}`);
        connectToDb();
    });
}

export default app;