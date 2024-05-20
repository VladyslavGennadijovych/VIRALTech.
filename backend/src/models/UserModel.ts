import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

export enum Status {
    ACTIVE = "Active",
    TEMPORARILY_BLOCKED = "Temporarily blocked",
    PERMANENTLY_BLOCKED = "Permanently blocked"
}

interface IUser extends Document {
    login: string;
    password: string;
    name: string;
    surname: string;
    phoneNumber: string;
    email: string;
    registrationDate: Date;
    status: Status;
    note: string;
}

const UserSchema: Schema = new Schema<IUser>({
    login: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        minlength: 10
    },
    name: { 
        type: String,
        required: true
    },
    surname: { 
        type: String,
        required: true
    },
    phoneNumber: { 
        type: String,
        required: true
    },
    email: { 
        type: String,
        required: true,
        unique: true
    },
    registrationDate: { 
        type: Date,
        alias: '$date',
        default: Date.now,
        required: true
    },
    status: { 
        type: String,
        enum: Object.values(Status),
        required: true
    },
    note: { 
        type: String
    }
}, {
    collection: 'users',
    versionKey: false
});

UserSchema.statics.signup = async function(login: string, password: string, name: string, surname: string, phoneNumber: string, email: string) {

    if (!login || !password || !name || !surname || !phoneNumber || !email) {
        throw new Error("All fields must be filled!");
    }

    if (!validator.isEmail(email)) {
        throw new Error("Invalid email!");
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error("Password not strong enought");
    }

    const exist = await this.findOne({ login });

    if (exist) {
        throw new Error("Login is already taken!");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const registrationDate = Date.now();

    const user = await this.create({login, password: hash, name, surname, phoneNumber, email, registrationDate, status: Status.ACTIVE });

    return user;
}

UserSchema.statics.login = async function(login: string, password: string) {
    if (!login || !password) {
        throw new Error("All fields must be filled!");
    }

    const user = await this.findOne({ login });

    if (!user) {
        throw Error("Incorrect login or password!");
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Incorrect login or password!");
    }

    return user;
}

const UserModel = mongoose.model<IUser>("Users", UserSchema);

export default UserModel;
