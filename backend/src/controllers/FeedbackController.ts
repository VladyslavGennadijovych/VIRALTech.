import { Request, Response } from "express";
import FeedbackModel from "../models/FeedbackModel";
import log4js from "../middleware/log4js";

const logger = log4js.getLogger();

class FeedbackController {

    async getFeedbackById(req: Request, res: Response) {
        const feedbackId = req.params.id;
        try {
            const feedback = await FeedbackModel.findById(feedbackId);
            if (feedback) {
                res.status(200).json(feedback);
                logger.info("Feedback was found.");
            } else {
                throw new Error("Feedback not found!");
            }
        } catch (error: any) {
            if (error.message.includes("Feedback not found!")) {
                res.status(404).json({ error: error.toString() });
            } else {
                res.status(500).json({ error: error.toString() });
            }
            logger.error("Error while finding Feedback: " + error);
        }
    }

    async getAllFeedbacks(req: Request, res: Response) {
        try {
            const keys = Object.keys(req.query);
            const fields = ["tripId", "passId", "driverId", "rating", "comment", "createdAt"];

            let wrongFields: string[] = [];
            for (const key of keys) {
                if (!fields.includes(key)) {
                    wrongFields.push(key);
                }
            }
            if (wrongFields.length != 0) {
                throw new Error("Wrong fields in parameters: " + wrongFields.join(', '));
            }
            const feedbacks = await FeedbackModel.find(req.query);
            res.status(200).json(feedbacks);
        } catch (error: any) {
            if (!error.message.includes("Wrong fields")) {
                res.status(500).json({error: "Internal server error!"});
            } else {
                res.status(400).json({error: "Incorrect request!", message: error.message});
            }
            logger.error(error);
        }
    }

    async createFeedback(req: Request, res: Response) {
        const { tripId, passId, driverId, rating, comment, createdAt } = req.body;

        if (!tripId || !passId || !driverId || !rating || !createdAt) {
            res.status(400).json({ error: 'All fields are required!' });
        }

        try {
            const savedFeedback = await new FeedbackModel({ tripId, passId, driverId, rating, comment, createdAt }).save();
            res.status(201).json(savedFeedback);
            logger.info("New Feedback was successfully added.");
        } catch (error: any) {
            res.status(500).json({ error: error.toString() });
            logger.error("Error while creating new Feedbacks: " + error);
        }
    }

    async updateFeedbackById(req: Request, res: Response) {
        const feedbackId = req.params.id;
        const { tripId, passId, driverId, rating, comment, createdAt } = req.body;
        try {
            const updatedFeedback = await FeedbackModel.findByIdAndUpdate(feedbackId, { tripId, passId, driverId, rating, comment, createdAt }, { new: true });
            if (updatedFeedback) {
                res.status(200).json(updatedFeedback);
                logger.info("Feedback was successfully updated.");
            } else {
                throw new Error("Feedback not found!");
            }
        } catch (error: any) {
            if (error.message.includes("Feedback not found!")) {
                res.status(404).json({ error: error.toString() });
            } else {
                res.status(500).json({ error: error.toString() });
            }
            logger.error("Error while updating Feedback: " + error);
        }
    }

    async deleteFeedbackById(req: Request, res: Response) {
        const feedbackId = req.params.id;
        try {
            const deletedFeedback = await FeedbackModel.findByIdAndDelete(feedbackId);
            if (deletedFeedback) {
                res.json(deletedFeedback);
                logger.info("Feedback was successfully deleted.");
            } else {
                throw new Error("Feedback not found!");
            }
        } catch (error: any) {
            if (error.message.includes("Feedback not found!")) {
                res.status(404).json({ error: error.toString() });
            } else {
                res.status(500).json({ error: error.toString() });
            }
            logger.error("Error while deleting Feedback: " + error);
        }
    }
}

export default new FeedbackController();