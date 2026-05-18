export interface TripListItem {
    id: string;
    tripName: string;
    createdAt: string;
}
export interface TripPoint {
    id: string;
    tripId: string;
    latitude: number;
    longitude: number;
    timestamp: string;
    speed: number;
    isIdle: boolean;
    isStopped: boolean;
    isOverspeed: boolean
}

export interface TripSegment {
    segmentIndex: number;
    startPointIndex: number;
    endPointIndex: number;
    distance: number;
    duration: number;
    idleDuration: number;
    stoppageDuration: number;
    overspeedDuration: number;
}

export interface TripDetails {
    id: string;
    tripName: string;
    startTime: string;
    endTime: string;
    totalDistance: number;
    totalDuration: number;
    totalIdleDuration: number;
    totalStoppageDuration: number;
    overspeedDuration: number;
    tripPoints: TripPoint[];
    segments: TripSegment[];
}