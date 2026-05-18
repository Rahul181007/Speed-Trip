import mongoose, { Document, Schema } from "mongoose";

export interface ITripPointDocument extends Document{
    tripId:mongoose.Types.ObjectId;
    latitude:number;
    longitude:number;
    timestamp:Date;
    speed:number;
    isIdle:boolean;
    isStopped:boolean;
    isOverspeed:boolean;
    createdAt:Date;
    updatedAt:Date
}

const TripPointSchema=new Schema<ITripPointDocument>(
    {
        tripId:{
            type:Schema.Types.ObjectId,
            ref:"Trip",
            required:true,
            index:true,
        },
        latitude:{
            type:Number,
            required:true,
        },
        longitude:{
            type:Number,
            required:true,
        },
        timestamp:{
            type:Date,
            required:true,
        },
        speed:{
            type:Number,
            required:true,
            default:0,
        },
        isIdle:{
            type:Boolean,
            required:true,
            default:false,
        },
        isStopped:{
            type:Boolean,
            required:true,
            default:false,
        },
        isOverspeed:{
            type:Boolean,
            required:true,
            default:false,
        }
    },{timestamps:true}
)

TripPointSchema.index({
    tripId:1,
    timestamp:1
})

export const TripPointModel=mongoose.model<ITripPointDocument>("TripPoint",TripPointSchema)