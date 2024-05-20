import mongoose, { Document, Schema } from 'mongoose';

interface IFeedback extends Document {
    tripId: mongoose.Types.ObjectId;
    passId: mongoose.Types.ObjectId;
    driverId: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    createdAt: Date;
}

const FeedbackSchema: Schema = new Schema<IFeedback>({
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
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
}, {
    collection: 'feedbacks',
    versionKey: false
});

const FeedbackModel = mongoose.model<IFeedback>('Feedback', FeedbackSchema);

export default FeedbackModel;
