import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import { MongoError } from "mongodb";
import cookieParser from "cookie-parser";
import UserModel, { Status } from './models/UserModel';
import log4js from "./middleware/log4js";
import UserRouter from "./routers/UserRouter";
import TripRouter from "./routers/TripRouter";
import ReservationRouter from "./routers/ReservationRouter";
import NotificationRouter from "./routers/NotificationRouter";
import MessageRouter from "./routers/MessageRouter";
import FeedbackRouter from "./routers/FeedbackRouter";

const logger = log4js.getLogger();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", UserRouter);
app.use("/api/trips", TripRouter);
app.use("/api/reservations", ReservationRouter);
app.use("/api/notifications", NotificationRouter);
app.use("/api/messages", MessageRouter);
app.use("/api/feedback", FeedbackRouter);

app.get("/", async (req: Request, res: Response) => {
    res.send("Server is running!");
});

const test = async () => {
    await new UserModel({
        login: "somelogin",
        password: "Pa123ss!@",
        name: "John",
        surname: "Doe",
        phoneNumber: "+3806648416516",
        email: "someemail@gmail.com",
        registrationDate: Date.now(),
        status: Status.ACTIVE
    }).save();
}

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL!, { dbName: "travelmate" });
        logger.info("Connected to MongoDB");
        app.listen(process.env.SERVER_PORT, () => {
            logger.info(`Server started on localhost:${process.env.SERVER_PORT}`);
        });
    } catch (error: MongoError | unknown) {
        if (error instanceof MongoError) {
            logger.error("Error connecting to MongoDB:", error);
        }
        logger.error("Error starting the server:", error);
        process.exit(1);
    }
};

start();