export interface TripSegmentResponseDTO{
    segmentIndex:number;
    startPointIndex:number;
    endPointIndex:number;
    distance:number;
    duration:number;
    idleDuration:number;
    stoppageDuration:number;
    overspeedDuration:number;
}