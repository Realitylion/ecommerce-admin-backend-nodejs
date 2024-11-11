require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 4000;

const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use("/product", productRoutes);
app.use("/category", categoryRoutes);

const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

async function connectDb() {
    await mongoose.connect(mongoUri, {
        dbName: dbName,
    });
    console.log('Connected to database');
}

connectDb().catch((error) => console.error(error));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

