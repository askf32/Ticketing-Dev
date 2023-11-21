import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middleware/error'
import { NotFoundError } from './errors/not-found-error'


const app = express()
app.use(express.json())

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', ()=>{
    throw new NotFoundError()
})

//express nature with aysnc
// app.all('*', async(req,res,next)=>{
//     next(new NotFoundError())
// })

app.use(errorHandler)

const mongooDB = async()=>{
try {
await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
} catch (error) {
    console.error(error);
    
}}
mongooDB()


app.listen(3000, ()=>{
    console.log("SERVER IS ONLINE ON 3000!");
    
})