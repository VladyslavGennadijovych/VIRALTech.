import mongoose, { Document, Schema } from 'mongoose';

export enum Status {
    SEND_TO_DRIVER = "Send to driver",
    UPROVED = "Uproved",
    DECLINED = "Declined"
}

interface IReservation extends Document {
    tripId: mongoose.Types.ObjectId;
    passId: mongoose.Types.ObjectId;
    status: Status;
    createdAt: Date;
}

const ReservationSchema: Schema = new Schema<IReservation>({
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trips',
        required: true
    },
    passId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    status: {
        type: String,
        enum: Object.values(Status),
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
}, {
    collection: 'reservations',
    versionKey: false
});

const ReservationModel = mongoose.model<IReservation>('Reservation', ReservationSchema);

export default ReservationModel;
