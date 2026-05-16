import { TripPoint } from "../../../domain/entities/TripPoint";
import fs from "fs"
import csv from "csv-parser";
import { calculateDistance } from "../../../shared/utils/calculateDistance";
import { calculateSpeed } from "../../../shared/utils/calculateSpeed";
interface CSVRow {
    latitude: string;
    longitude: string;
    timestamp: string;
    ignition: string;
}

export const processTripCSV = (filePath: string): Promise<{
    tripPoints: TripPoint[];
    totalDistance: number;
    totalIdleDuration: number;
    totalStoppageDuration: number;
    overspeedDuration: number;
    startTime: Date;
    endTime: Date;
}> => {
    return new Promise((resolve, reject) => {
        const rows: CSVRow[] = [];
        fs.createReadStream(filePath).pipe(csv())
            .on("data", (row: CSVRow) => {
                rows.push(row)
            })
            .on("end", () => {
                const tripPoints: TripPoint[] = [];

                let totalDistance = 0;
                let totalIdleDuration = 0;
                let totalStoppageDuration = 0;
                let overspeedDuration = 0;

                for (let index = 0; index < rows.length; index++) {
                    const currentRow = rows[index];
                    const latitude = Number(currentRow.latitude);
                    const longitude = Number(currentRow.longitude);
                    const timestamp = new Date(currentRow.timestamp);
                    const ignition = currentRow.ignition.toLowerCase();


                    let speed = 0;
                    let isIdle = false;
                    let isStopped = false;
                    let isOverspeed = false;

                    if (index > 0) {
                        const previousRow = rows[index - 1];
                        const previousLatitude = Number(previousRow.latitude);
                        const previousLongitude = Number(previousRow.longitude);
                        const previousTimestamp = new Date(previousRow.timestamp);

                        const distance = calculateDistance(
                            previousLatitude,
                            previousLongitude,
                            latitude,
                            longitude
                        )
                        totalDistance += distance

                        speed = calculateSpeed(
                            distance,
                            previousTimestamp, timestamp
                        )

                        if (speed > 60) {
                            isOverspeed = true;
                            overspeedDuration += (timestamp.getTime() - previousTimestamp.getTime()) / (1000 * 60)
                        }

                        if (speed === 0 && ignition === "on") {
                            isIdle = true;
                            totalIdleDuration += (timestamp.getTime() - previousTimestamp.getTime()) / (1000 * 60)
                        }

                        if (speed === 0 && ignition === "off") {
                            isStopped = true;
                            totalStoppageDuration += (timestamp.getTime() - previousTimestamp.getTime()) / (1000 * 60)
                        }
                    }
                    tripPoints.push(

                        new TripPoint(
                            "",
                            "",
                            latitude,
                            longitude,
                            timestamp,
                            speed,
                            isIdle,
                            isStopped,
                            isOverspeed,
                            new Date(),
                            new Date()
                        )
                    );
                }
                
                const startTime = new Date(rows[0].timestamp);
                const endTime = new Date(rows[rows.length - 1].timestamp);
                resolve({
                    tripPoints,
                    totalDistance,
                    totalIdleDuration,
                    totalStoppageDuration,
                    overspeedDuration,
                    startTime,
                    endTime

                })
            })
            .on("error", reject)
    })
}