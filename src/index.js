// require('dotenv').config({ path: './.env' })

import dotenv from 'dotenv';
import connectDB from './db/index.js';

dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
        console.log(`Server listening at port ${port}`);
    })
})
.catch((err) => {
    console.log("MogoDB Connection Failed!!!\n", err);
})