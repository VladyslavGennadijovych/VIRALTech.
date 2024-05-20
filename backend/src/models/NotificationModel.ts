import mongoose, { Document, Schema } from 'mongoose';

interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  text: string;
  date: Date;
  status: string;
}

const NotificationSchema: Schema = new Schema<INotification>({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true 
},
  text: { 
    type: String, 
    required: true 
},
  date: { 
    type: Date, 
    required: true 
},
  status: { 
    type: String, 
    required: true 
}
}, {
    collection: 'notifications',
    versionKey: false
});

const NotificationModel = mongoose.model<INotification>('Notification', NotificationSchema);

export default NotificationModel;
