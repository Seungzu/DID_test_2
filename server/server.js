const express = require('express')
const app = express();
const cors = require('cors')

const userRouter = require('./routers/user.router.js')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(
    cors({
        origin:[
            'http://localhost:3000'
        ],
        credentials:true,
    })
)

app.use('/user',userRouter)

app.post('/user/regist', (req,res)=>{
    console.log(req.body)
    res.json({a:33333})
})

app.listen(4000,()=>{
    console.log('start server port 4000')
})