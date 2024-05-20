import { Request, Response } from "express";
import NotificationModel from "../models/NotificationModel";
import log4js from "../middleware/log4js";

const logger = log4js.getLogger();

class NotificationController {

    async getNotificationById(req: Request, res: Response) {
        const notificationId = req.params.id;
        try {
            const notification = await NotificationModel.findById(notificationId);
            if (notification) {
                res.status(200).json(notification);
                logger.info("Notification was found.");
            } else {
                throw new Error("Notification not found!");
            }
        } catch (error: any) {
            if (error.message.includes("Notification not found!")) {
                res.status(404).json({ error: error.toString() });
            } else {
                res.status(500).json({ error: error.toString() });
            }
            logger.error("Error while finding Notification: " + error);
        }
    }

    async getAllNotifications(req: Request, res: Response) {
        try {
            const keys = Object.keys(req.query);
            const fields = ["userId", "text", "date", "status"];
            let wrongFields: string[] = [];
            for (const key of keys) {
                if (!fields.includes(key)) {
                    wrongFields.push(key);
                }
            }
            if (wrongFields.length != 0) {
                throw new Error("Wrong fields in parameters: " + wrongFields.join(', '));
            }
            const notifications = await NotificationModel.find(req.query);
            res.status(200).json(notifications);
        } catch (error: any) {
            if (!error.message.includes("Wrong fields")) {
                res.status(500).json({error: "Internal server error!"});
            } else {
                res.status(400).json({error: "Incorrect request!", message: error.message});
            }
            logger.error(error);
        }
    }

    async createNotification(req: Request, res: Response) {
        const { userId, text, date, status } = req.body;

        if (!userId || !text || !date || !status) {
            res.status(400).json({ error: 'All fields are required!' });
        }

        try {
            const savedNotification = await new NotificationModel({ userId, text, date, status }).save();
            res.status(201).json(savedNotification);
            logger.info("New Notification was successfully added.");
        } catch (error: any) {
            res.status(500).json({ error: error.toString() });
            logger.error("Error while creating new Notifications: " + error);
        }
    }

    async updateNotificationById(req: Request, res: Response) {
        const notificationId = req.params.id;
        const { userId, text, date, status } = req.body;
        try {
            const updatedNotification = await NotificationModel.findByIdAndUpdate(notificationId, { userId, text, date, status }, { new: true });
            if (updatedNotification) {
                res.status(200).json(updatedNotification);
                logger.info("Notification was successfully updated.");
            } else {
                throw new Error("Notification not found!");
            }
        } catch (error: any) {
            if (error.message.includes("Notification not found!")) {
                res.status(404).json({ error: error.toString() });
            } else {
                res.status(500).json({ error: error.toString() });
            }
            logger.error("Error while updating Notification: " + error);
        }
    }

    async deleteNotificationById(req: Request, res: Response) {
        const notificationId = req.params.id;
        try {
            const deletedNotification = await NotificationModel.findByIdAndDelete(notificationId);
            if (deletedNotification) {
                res.json(deletedNotification);
                logger.info("Notification was successfully deleted.");
            } else {
                throw new Error("Notification not found!");
            }
        } catch (error: any) {
            if (error.message.includes("Notification not found!")) {
                res.status(404).json({ error: error.toString() });
            } else {
                res.status(500).json({ error: error.toString() });
            }
            logger.error("Error while deleting Notification: " + error);
        }
    }
}

export default new NotificationController();