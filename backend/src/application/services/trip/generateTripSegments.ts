import { TripPoint } from "../../../domain/entities/TripPoint";
import { calculateDistance } from "../../../shared/utils/calculateDistance";
import { TripSegmentResponseDTO } from "../../dto/trip/TripSegmentResponseDTO";

export const generateTripSegments=(
    tripPoints:TripPoint[]
):TripSegmentResponseDTO[]=>{
    const segments:TripSegmentResponseDTO[]=[];
    const segmentSize=20;

    for(let startIndex=0;startIndex<tripPoints.length;startIndex+=segmentSize){
        const endIndex=Math.min(startIndex+segmentSize-1,tripPoints.length-1);
        const segmentPoints=tripPoints.slice(startIndex,endIndex+1);
        let idleDuration=0;
        let stoppageDuration=0;
        let overspeedDuration=0;
        let distance=0
        for(let index=1;index<segmentPoints.length;index++){
            const currentPoint=segmentPoints[index];
            const previousPoint=segmentPoints[index-1];
            const timeDifference=(currentPoint.timestamp.getTime()-previousPoint.timestamp.getTime())/(1000*60);
            if(currentPoint.isIdle){
                idleDuration+=timeDifference;
            }
            if(currentPoint.isStopped){
                stoppageDuration+=timeDifference
            }
            if(currentPoint.isOverspeed){
                overspeedDuration+=timeDifference
            }

            distance += calculateDistance(
    previousPoint.latitude,
    previousPoint.longitude,
    currentPoint.latitude,
    currentPoint.longitude
);
        }

        const startTime=segmentPoints[0].timestamp;
        const endTime=segmentPoints[segmentPoints.length-1].timestamp;
        const duration=(endTime.getTime()-startTime.getTime())/(1000*60);
        segments.push({
            segmentIndex:segments.length+1,
            startPointIndex:startIndex,
            endPointIndex:endIndex,
            distance,
            duration,
            idleDuration,
            stoppageDuration,
            overspeedDuration
        })
    }
    return segments
}