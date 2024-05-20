import mongoose, { Document, Schema } from 'mongoose';

export enum Status {
    READ = "Read",
    UNREAD = "Unread"
}

interface IMessage extends Document {
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    message: string;
    status: Status;
    date: Date;
}

const MessageSchema: Schema = new Schema<IMessage>({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(Status),
        required: true
    },
    date: {
        type: Date,
        alias: '$date',
        required: true
    }
}, {
    collection: 'messages',
    versionKey: false
});

const MessageModel = mongoose.model<IMessage>('Message', MessageSchema);

export default MessageModel;
