const connectToMongo = require('./db')
const express = require('express')
const app = express();
const port = process.env.PORT || 5000

connectToMongo();
app.use(express.json())

app.use('/auth',require('./routes/auth'))
app.use('/data',require('./routes/userActivity'))

app.listen(port,()=>{
    console.log(`you are listening at ${port}`)
})
