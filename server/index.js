const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const postsRoutes = require ('./routes/posts')
const userRouter = require ('./routes/user')

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/posts', postsRoutes);
app.use("/user", userRouter);

const DB_URL = 'mongodb+srv://posttextuser:posttext123@cluster0.2c807.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;
console.log("DB_URL:::::",DB_URL)

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => 
	 app.listen(PORT, () => console.log(`server running on port: ${PORT}`)))
.catch((error) => console.log("Error::::", error.message));

mongoose.set('useFindAndModify', false)