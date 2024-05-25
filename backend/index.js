const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload')
const database = require('./config/database.js');
const userRoutes = require('./routes/user.js');
const categoryRoutes = require('./routes/category.js')
const bookRoutes = require('./routes/books.js')
const reserveBookRoutes = require('./routes/reservedBooks.js')
const { cloudinaryConnect } = require('./config/cloudinary.js');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors());
app.use(morgan("dev"))


require('dotenv').config()

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/book', bookRoutes);
app.use('/api/v1/reservedBooks', reserveBookRoutes)

database.dbConnect();

cloudinaryConnect();

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})