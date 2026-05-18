import { deleteTrip, getTripDetails, getUserTrips, uploadTrip } from "../api/tripApi"
import type { TripDetails, TripListItem } from "../types/tripTypes"

export const getUserTripsService = async (): Promise<TripListItem[]> => {
    return await getUserTrips();
};
export const getTripDetailsService = async (tripId: string): Promise<TripDetails> => {
    return await getTripDetails(tripId)
}

export const uploadTripService = async (formData: FormData): Promise<TripListItem> => {
    return await uploadTrip(formData);
};

export const deleteTripService = async (tripId: string): Promise<void> => {
    await deleteTrip(tripId);
};