import mongoose from "mongoose";
import { Password } from "../services/password";

//An interface that describes the properties
// that are required to create a new user

interface UserAtters{
    email: string,
    password: string
}

//An interface that describes the properties
// that a user model has

interface UserModel extends mongoose.Model<UserDoc>{
build(atters: UserAtters): UserDoc;

}

//An interface that describes the properties
// that a user document has

interface UserDoc extends mongoose.Document{
    email: string;
    password: string,
}


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

userSchema.pre('save', async function (done){
    if(this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
    }
    done()
})

userSchema.statics.build = (atters: UserAtters)=>{
return new User(atters)

}
const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export {User}