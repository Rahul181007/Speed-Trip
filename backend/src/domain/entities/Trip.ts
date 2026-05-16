export class Trip {

    constructor(

        public id: string,

        public userId: string,

        public tripName: string,

        public fileName: string,

        public filePath: string,

        public startTime: Date,

        public endTime: Date,

        public totalDistance: number,

        public totalDuration: number,

        public totalIdleDuration: number,

        public totalStoppageDuration: number,

        public overspeedDuration: number,

        public readonly createdAt: Date,

        public readonly updatedAt: Date

    ) { }
}