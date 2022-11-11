const express = require('express')
const app = express();
const cors = require('cors')

const userRouter = require('./routers/user.router.js')
const devRouter = require('./routers/dev.router.js')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(
    cors({
        origin:[
            'http://localhost:3000',
            '*'
        ],
        credentials:true,
    })
)

app.use('/user', userRouter)
app.use('/dev', devRouter)

app.listen(4000,()=>{
    console.log('start server port 4000')
})