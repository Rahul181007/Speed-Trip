import { useCallback, useEffect, useState } from "react"
import type { TripListItem } from "../types/tripTypes"
import { deleteTripService, getUserTripsService } from "../services/tripService";

const useTrips = () => {
    const [trips, setTrips] = useState<TripListItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchTrips = useCallback(async () => {
        try {
            setLoading(true);
            setError("");
            const response = await getUserTripsService();
            setTrips(response);
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "Failed to fetch trips");
        } finally {
            setLoading(false);
        }
    }, []);

    const removeTrip = async (tripId: string) => {
        try {
            setError("");
            await deleteTripService(tripId);
            setTrips((previousTrips) =>
                previousTrips.filter((trip) => trip.id !== tripId)
            )
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "failed to delete trip")
            throw error
        }
    }
    useEffect(() => {
        const loadTrips = async () => {
            await fetchTrips();
        };
        loadTrips();

    }, [fetchTrips]);

    return {
        trips,
        loading,
        error,
        fetchTrips,
        removeTrip
    }
}

export default useTrips;