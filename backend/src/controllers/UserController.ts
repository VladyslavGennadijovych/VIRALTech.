import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import log4js from "../middleware/log4js";
import jwt from "../middleware/jwt";

const logger = log4js.getLogger();

class UserController {

    async getUserById(req: Request, res: Response) {
        const userId = req.params.id;
        try {
            const user = await UserModel.findById(userId);
            if (user) {
                res.status(200).json(user);
                logger.info("User was found.");
            } else {
                throw new Error("User not found!");
            }
        } catch (error: any) {
            if (error.message.includes("User not found!")) {
                res.status(404).json({ error: error.toString() });
            } else {
                res.status(500).json({ error: error.toString() });
            }
            logger.error("Error while finding User: " + error);
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const keys = Object.keys(req.query);
            const fields = ["login", "password", "name", "surname", "phoneNumber", "email", "registrationDate", "status", "note"];
            let wrongFields: string[] = [];
            for (const key of keys) {
                if (!fields.includes(key)) {
                    wrongFields.push(key);
                }
            }
            if (wrongFields.length != 0) {
                throw new Error("Wrong fields in parameters: " + wrongFields.join(', '));
            }
            const users = await UserModel.find(req.query);
            res.status(200).json(users);
        } catch (error: any) {
            if (!error.message.includes("Wrong fields")) {
                res.status(500).json({error: "Internal server error!"});
            } else {
                res.status(400).json({error: "Incorrect request!", message: error.message});
            }
            logger.error(error);
        }
    }

    async createUser(req: Request, res: Response) {
        const { login, password, name, surname, phoneNumber, email, registrationDate, status, note } = req.body;

        if (!login || !password || !name || !surname || !phoneNumber || !email || !registrationDate || !status) {
            res.status(400).json({ error: 'All fields are required!' });
        }

        try {
            const savedUser = await new UserModel({ login, password, name, surname, phoneNumber, email, registrationDate, status, note }).save();
            res.status(201).json(savedUser);
            logger.info("New User was successfully added.");
        } catch (error: any) {
            res.status(500).json({ error: error.toString() });
            logger.error("Error while creating new Users: " + error);
        }
    }

    async updateUserById(req: Request, res: Response) {
        const userId = req.params.id;
        const { login, password, name, surname, phoneNumber, email, registrationDate, status, note } = req.body;
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(userId, { login, password, name, surname, phoneNumber, email, registrationDate, status, note }, { new: true });
            if (updatedUser) {
                res.status(200).json(updatedUser);
                logger.info("User was successfully updated.");
            } else {
                throw new Error("User not found!");
            }
        } catch (error: any) {
            if (error.message.includes("User not found!")) {
                res.status(404).json({ error: error.toString() });
            } else {
                res.status(500).json({ error: error.toString() });
            }
            logger.error("Error while updating User: " + error);
        }
    }

    async deleteUserById(req: Request, res: Response) {
        const userId = req.params.id;
        try {
            const deletedUser = await UserModel.findByIdAndDelete(userId);
            if (deletedUser) {
                res.json(deletedUser);
                logger.info("User was successfully deleted.");
            } else {
                throw new Error("User not found!");
            }
        } catch (error: any) {
            if (error.message.includes("User not found!")) {
                res.status(404).json({ error: error.toString() });
            } else {
                res.status(500).json({ error: error.toString() });
            }
            logger.error("Error while deleting User: " + error);
        }
    }

    async loginUser(req: Request, res: Response) {
        const { login, password } = req.body;

        try {
            // @ts-ignore
            const user = await UserModel.login(login, password);

            const token = await jwt.createToken(user.id);
            
            res.status(200).json({ token });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
    
    async signupUser(req: Request, res: Response) {
        const { login, password, name, surname, phoneNumber, email } = req.body;

        try {
            // @ts-ignore
            const user = await UserModel.signup(login, password, name, surname, phoneNumber, email);

            const token = await jwt.createToken(user.id);
            
            res.status(201).json({ token });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new UserController();