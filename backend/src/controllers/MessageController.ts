import { Request, Response } from "express";
import MessageModel from "../models/MessageModel";
import log4js from "../middleware/log4js";

const logger = log4js.getLogger();

class MessageController {

    async getMessageById(req: Request, res: Response) {
        const messageId = req.params.id;
        try {
            const message = await MessageModel.findById(messageId);
            if (message) {
                res.status(200).json(message);
                logger.info("Message was found.");
            } else {
                throw new Error("Message not found!");
            }
        } catch (error: any) {
            if (error.message.includes("Message not found!")) {
                res.status(404).json({ error: error.toString() });
            } else {
                res.status(500).json({ error: error.toString() });
            }
            logger.error("Error while finding Message: " + error);
        }
    }

    async getAllMessages(req: Request, res: Response) {
        try {
            const keys = Object.keys(req.query);
            const fields = ["sender", "receiver", "message", "status", "date"];
            let wrongFields: string[] = [];
            for (const key of keys) {
                if (!fields.includes(key)) {
                    wrongFields.push(key);
                }
            }
            if (wrongFields.length != 0) {
                throw new Error("Wrong fields in parameters: " + wrongFields.join(', '));
            }
            const messages = await MessageModel.find(req.query);
            res.status(200).json(messages);
        } catch (error: any) {
            if (!error.message.includes("Wrong fields")) {
                res.status(500).json({error: "Internal server error!"});
            } else {
                res.status(400).json({error: "Incorrect request!", message: error.message});
            }
            logger.error(error);
        }
    }

    async createMessage(req: Request, res: Response) {
        const { sender, receiver, message, status, date } = req.body;

        if (!sender || !receiver || !message || !status || !date) {
            res.status(400).json({ error: 'All fields are required!' });
        }

        try {
            const savedMessage = await new MessageModel({ sender, receiver, message, status, date }).save();
            res.status(201).json(savedMessage);
            logger.info("New Message was successfully added.");
        } catch (error: any) {
            res.status(500).json({ error: error.toString() });
            logger.error("Error while creating new Messages: " + error);
        }
    }

    async updateMessageById(req: Request, res: Response) {
        const messageId = req.params.id;
        const { sender, receiver, message, status, date } = req.body;
        try {
            const updatedMessage = await MessageModel.findByIdAndUpdate(messageId, { sender, receiver, message, status, date }, { new: true });
            if (updatedMessage) {
                res.status(200).json(updatedMessage);
                logger.info("Message was successfully updated.");
            } else {
                throw new Error("Message not found!");
            }
        } catch (error: any) {
            if (error.message.includes("Message not found!")) {
                res.status(404).json({ error: error.toString() });
            } else {
                res.status(500).json({ error: error.toString() });
            }
            logger.error("Error while updating Message: " + error);
        }
    }

    async deleteMessageById(req: Request, res: Response) {
        const messageId = req.params.id;
        try {
            const deletedMessage = await MessageModel.findByIdAndDelete(messageId);
            if (deletedMessage) {
                res.json(deletedMessage);
                logger.info("Message was successfully deleted.");
            } else {
                throw new Error("Message not found!");
            }
        } catch (error: any) {
            if (error.message.includes("Message not found!")) {
                res.status(404).json({ error: error.toString() });
            } else {
                res.status(500).json({ error: error.toString() });
            }
            logger.error("Error while deleting Message: " + error);
        }
    }
}

export default new MessageController();