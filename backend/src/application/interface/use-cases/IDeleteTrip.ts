export interface IDeleteTrip{
    execute(tripId:string):Promise<void>
}