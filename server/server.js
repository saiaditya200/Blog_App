const exp = require("express");
const cors = require('cors');
const app = exp();
require('dotenv').config();
const mongoose = require("mongoose");
const userApp = require('./APIs/userApi');
const authorApp = require('./APIs/authorApi');
const adminApp = require('./APIs/adminApi');

const port = process.env.PORT || 4000;

// Enable CORS for all routes, allowing requests from frontend
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Handle preflight requests
app.options('*', cors());

// DB connection
mongoose.connect(process.env.DBURL)
  .then(() => { 
    app.listen(port, () => console.log(`Server listening on port ${port}..`))
    console.log("DB connection success")
  })
  .catch(err => console.log("Error in DB connection", err))

// Body parser middleware
app.use(exp.json());

// Connect API routes
app.use('/user-api', userApp);
app.use('/author-api', authorApp);
app.use('/admin-api', adminApp);
