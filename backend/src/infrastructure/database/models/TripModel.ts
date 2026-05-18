import mongoose, { Document, Schema } from "mongoose";

export interface ITripDocument extends Document {
    userId: mongoose.Types.ObjectId;
    tripName: string;
    fileName: string;
    filePath: string;
    startTime: Date;
    endTime: Date;
    totalDistance: number;
    totalDuration: number;
    totalIdleDuration: number;
    totalStoppageDuration: number;
    overspeedDuration: number;
    createdAt: Date;
    updatedAt: Date;

}

const TripSchema = new Schema<ITripDocument>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        tripName: {
            type: String,
            required: true,
            trim: true
        },
        fileName: {
            type: String,
            required: true
        },

        filePath: {
            type: String,
            required: true
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,

        },
        totalDistance: {
            type: Number,
            required: true,
            default: 0,
        },
        totalDuration: {
            type: Number,
            required: true,
            default: 0
        },
        totalIdleDuration: {
            type: Number,
            required: true,
            default: 0
        },
        totalStoppageDuration: {
            type: Number,
            required: true,
            default: 0
        },
        overspeedDuration: {
            type: Number,
            required: true,
            default: 0
        }
    }, { timestamps: true }
)


TripSchema.index({
    userId: 1,
    createdAt: -1,
})

export const TripModel = mongoose.model<ITripDocument>("Trip", TripSchema)