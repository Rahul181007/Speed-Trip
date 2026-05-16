export class TripPoint{
    constructor(
     public id:string,
     public tripId:string,
     public latitude:number,
     public longitude:number,
     public timestamp:Date,
     public speed:number,
     public isIdle:boolean,
     public isStopped:boolean,
     public isOverspeed:boolean,
     public readonly createdAt:Date,
     public readonly updatedAt:Date
    ){}
}