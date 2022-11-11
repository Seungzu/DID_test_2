const express = require('express')
const app = express();
const cors = require('cors')

const userRouter = require('./routers/user.router.js')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(
    cors({
        origin:[
            'http://localhost:5000'
        ],
        credentials:true,
    })
)

app.use('/user',userRouter)

app.listen(5001,()=>{
    console.log('start testA port : 5001');
})