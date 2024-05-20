import { Request, Response } from "express";
import TripModel from "../models/TripModel";
import log4js from "../middleware/log4js";

const logger = log4js.getLogger();

class TripController {

    async getTripById(req: Request, res: Response) {
        const tripId = req.params.id;
        try {
            const trip = await TripModel.findById(tripId);
            if (trip) {
                res.status(200).json(trip);
                logger.info("Trip was found.");
            } else {
                throw new Error("Trip not found!");
            }
        } catch (error: any) {
            if (error.message.includes("Trip not found!")) {
                res.status(404).json({ error: error.toString() });
            } else {
                res.status(500).json({ error: error.toString() });
            }
            logger.error("Error while finding Trip: " + error);
        }
    }

    async getAllTrips(req: Request, res: Response) {
        try {
            const keys = Object.keys(req.query);
            const fields = ["departureAddress", "arrivalAddress", "date", "pricePerSeat", "passIds", "driverId", "numberOfSeats", "numberOfAvailableSeats", "vehicle", "petsAllowed", "smokingAllowed", "createdAt"];
            let wrongFields: string[] = [];
            for (const key of keys) {
                if (!fields.includes(key)) {
                    wrongFields.push(key);
                }
            }
            if (wrongFields.length != 0) {
                throw new Error("Wrong fields in parameters: " + wrongFields.join(', '));
            }
            const trips = await TripModel.find(req.query);
            res.status(200).json(trips);
        } catch (error: any) {
            if (!error.message.includes("Wrong fields")) {
                res.status(500).json({error: "Internal server error!"});
            } else {
                res.status(400).json({error: "Incorrect request!", message: error.message});
            }
            logger.error(error);
        }
    }

    async createTrip(req: Request, res: Response) {
        const { departureAddress, arrivalAddress, date, pricePerSeat, passIds, driverId, numberOfSeats, numberOfAvailableSeats, vehicle, petsAllowed, smokingAllowed, createdAt } = req.body;

        if (!departureAddress || !arrivalAddress || !date || !pricePerSeat || !passIds || !driverId || !numberOfSeats || !numberOfAvailableSeats || !vehicle || !petsAllowed || !smokingAllowed || !createdAt) {
            res.status(400).json({ error: 'All fields are required!' });
        }

        try {
            const savedTrip = await new TripModel({ departureAddress, arrivalAddress, date, pricePerSeat, passIds, driverId, numberOfSeats, numberOfAvailableSeats, vehicle, petsAllowed, smokingAllowed, createdAt }).save();
            res.status(201).json(savedTrip);
            logger.info("New Trip was successfully added.");
        } catch (error: any) {
            res.status(500).json({ error: error.toString() });
            logger.error("Error while creating new Trips: " + error);
        }
    }

    async updateTripById(req: Request, res: Response) {
        const tripId = req.params.id;
        const { departureAddress, arrivalAddress, date, pricePerSeat, passIds, driverId, numberOfSeats, numberOfAvailableSeats, vehicle, petsAllowed, smokingAllowed, createdAt } = req.body;
        try {
            const updatedTrip = await TripModel.findByIdAndUpdate(tripId, { departureAddress, arrivalAddress, date, pricePerSeat, passIds, driverId, numberOfSeats, numberOfAvailableSeats, vehicle, petsAllowed, smokingAllowed, createdAt }, { new: true });
            if (updatedTrip) {
                res.status(200).json(updatedTrip);
                logger.info("Trip was successfully updated.");
            } else {
                throw new Error("Trip not found!");
            }
        } catch (error: any) {
            if (error.message.includes("Trip not found!")) {
                res.status(404).json({ error: error.toString() });
            } else {
                res.status(500).json({ error: error.toString() });
            }
            logger.error("Error while updating Trip: " + error);
        }
    }

    async deleteTripById(req: Request, res: Response) {
        const tripId = req.params.id;
        try {
            const deletedTrip = await TripModel.findByIdAndDelete(tripId);
            if (deletedTrip) {
                res.json(deletedTrip);
                logger.info("Trip was successfully deleted.");
            } else {
                throw new Error("Trip not found!");
            }
        } catch (error: any) {
            if (error.message.includes("Trip not found!")) {
                res.status(404).json({ error: error.toString() });
            } else {
                res.status(500).json({ error: error.toString() });
            }
            logger.error("Error while deleting Trip: " + error);
        }
    }
}

export default new TripController();