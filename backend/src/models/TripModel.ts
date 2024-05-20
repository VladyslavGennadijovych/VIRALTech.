import mongoose, { Document, Schema } from 'mongoose';

interface ITrip extends Document {
    departureAddress: string;
    arrivalAddress: string;
    date: Date;
    pricePerSeat: number;
    passIds: mongoose.Types.ObjectId[];
    driverId: mongoose.Types.ObjectId;
    numberOfSeats: number;
    numberOfAvailableSeats: number;
    vehicle: string;
    petsAllowed: boolean;
    smokingAllowed: boolean;
    createdAt: Date;
}

const TripSchema: Schema = new Schema<ITrip>({
    departureAddress: {
        type: String,
        required: true
    },
    arrivalAddress: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        alias: '$date',
        required: true
    },
    pricePerSeat: {
        type: Number,
        required: true,
        min: 0
    },
    passIds: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Users',
        required: true
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    numberOfSeats: {
        type: Number,
        required: true,
        min: 1
    },
    numberOfAvailableSeats: {
        type: Number,
        required: true,
        min: 0
    },
    vehicle: {
        type: String,
        required: true
    },
    petsAllowed: {
        type: Boolean,
        required: true
    },
    smokingAllowed: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
}, {
    collection: 'trips',
    versionKey: false
});

const TripModel = mongoose.model<ITrip>('Trips', TripSchema);

export default TripModel;
