import { Request, Response } from "express";
import ReservationModel from "../models/ReservationModel";
import log4js from "../middleware/log4js";

const logger = log4js.getLogger();

class ReservationController {

    async getReservationById(req: Request, res: Response) {
        const reservationId = req.params.id;
        try {
            const reservation = await ReservationModel.findById(reservationId);
            if (reservation) {
                res.status(200).json(reservation);
                logger.info("Reservation was found.");
            } else {
                throw new Error("Reservation not found!");
            }
        } catch (error: any) {
            if (error.message.includes("Reservation not found!")) {
                res.status(404).json({ error: error.toString() });
            } else {
                res.status(500).json({ error: error.toString() });
            }
            logger.error("Error while finding Reservation: " + error);
        }
    }

    async getAllReservations(req: Request, res: Response) {
        try {
            const keys = Object.keys(req.query);
            const fields = ["tripId", "passId", "status", "createdAt"];
            let wrongFields: string[] = [];
            for (const key of keys) {
                if (!fields.includes(key)) {
                    wrongFields.push(key);
                }
            }
            if (wrongFields.length != 0) {
                throw new Error("Wrong fields in parameters: " + wrongFields.join(', '));
            }
            const reservations = await ReservationModel.find(req.query);
            res.status(200).json(reservations);
        } catch (error: any) {
            if (!error.message.includes("Wrong fields")) {
                res.status(500).json({error: "Internal server error!"});
            } else {
                res.status(400).json({error: "Incorrect request!", message: error.message});
            }
            logger.error(error);
        }
    }

    async createReservation(req: Request, res: Response) {
        const { tripId, passId, status, createdAt } = req.body;

        if (!tripId || !passId || !status || !createdAt) {
            res.status(400).json({ error: 'All fields are required!' });
        }

        try {
            const savedReservation = await new ReservationModel({ tripId, passId, status, createdAt }).save();
            res.status(201).json(savedReservation);
            logger.info("New Reservation was successfully added.");
        } catch (error: any) {
            res.status(500).json({ error: error.toString() });
            logger.error("Error while creating new Reservations: " + error);
        }
    }

    async updateReservationById(req: Request, res: Response) {
        const reservationId = req.params.id;
        const { tripId, passId, status, createdAt } = req.body;
        try {
            const updatedReservation = await ReservationModel.findByIdAndUpdate(reservationId, { tripId, passId, status, createdAt }, { new: true });
            if (updatedReservation) {
                res.status(200).json(updatedReservation);
                logger.info("Reservation was successfully updated.");
            } else {
                throw new Error("Reservation not found!");
            }
        } catch (error: any) {
            if (error.message.includes("Reservation not found!")) {
                res.status(404).json({ error: error.toString() });
            } else {
                res.status(500).json({ error: error.toString() });
            }
            logger.error("Error while updating Reservation: " + error);
        }
    }

    async deleteReservationById(req: Request, res: Response) {
        const reservationId = req.params.id;
        try {
            const deletedReservation = await ReservationModel.findByIdAndDelete(reservationId);
            if (deletedReservation) {
                res.json(deletedReservation);
                logger.info("Reservation was successfully deleted.");
            } else {
                throw new Error("Reservation not found!");
            }
        } catch (error: any) {
            if (error.message.includes("Reservation not found!")) {
                res.status(404).json({ error: error.toString() });
            } else {
                res.status(500).json({ error: error.toString() });
            }
            logger.error("Error while deleting Reservation: " + error);
        }
    }
}

export default new ReservationController();