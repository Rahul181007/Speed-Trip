
import type { TripListItem } from "../types/tripTypes";
import { useState } from "react";

interface TripListProps {
    trips: TripListItem[];
    onDelete: (tripId: string) => void;
    onOpen: (tripId: string) => void
}

const TripList = ({
    trips,
    onDelete,
    onOpen
}: TripListProps) => {
    const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
    const handleSelect = (tripId: string) => {
        setSelectedTripId((prev) => prev === tripId ? null : tripId)
    }
    const selectedTrip = trips.find((trip) => trip.id === selectedTripId)
    return (
        <div>

            {/* Header */}
            <div className="flex items-center justify-between mb-4">

                <h2 className="font-semibold text-lg">
                    Your Trips
                </h2>

                <div className="flex gap-3">

                    <button
                        disabled={!selectedTrip}
                        onClick={() => {

                            if (selectedTrip) {
                                onDelete(selectedTrip.id);
                            }
                        }}
                        className="
                            border
                            px-5
                            py-1.5
                            rounded-md
                            text-sm
                            disabled:opacity-40
                        "
                    >
                        Delete
                    </button>

                    <button
                        disabled={!selectedTrip}
                        onClick={() => {

                            if (selectedTrip) {
                                onOpen(selectedTrip.id);
                            }
                        }}
                        className="
                            bg-[#102B3F]
                            text-white
                            px-5
                            py-1.5
                            rounded-md
                            text-sm
                            disabled:opacity-40
                        "
                    >
                        Open
                    </button>

                </div>

            </div>

            {/* Table */}
            <div className="border rounded-md overflow-hidden">

                {/* Table Header */}
                <div
                    className="
                        grid
                        grid-cols-[50px_1fr_180px]
                        bg-gray-50
                        px-4
                        py-3
                        text-sm
                        font-medium
                        text-gray-500
                        border-b
                    "
                >
                    <p></p>
                    <p>Trips</p>
                    <p>Created</p>
                </div>

                {/* Rows */}
                {
                    trips.map((trip) => (

                        <div
                            key={trip.id}
                            className={`
                                grid
                                grid-cols-[50px_1fr_180px]
                                items-center
                                px-4
                                py-3
                                border-b
                                text-sm
                                cursor-pointer
                                transition-colors

                                ${selectedTripId === trip.id
                                    ? "bg-blue-50"
                                    : "bg-white"
                                }
                            `}
                            onClick={() =>
                                handleSelect(trip.id)
                            }
                        >

                            <input
                                type="checkbox"
                                checked={selectedTripId === trip.id}
                                onChange={() => handleSelect(trip.id)}
                                onClick={(event) => event.stopPropagation()}
                            />

                            <p>
                                {trip.tripName}
                            </p>

                            <p className="text-gray-500">
                                {
                                    new Date(
                                        trip.createdAt
                                    ).toLocaleDateString()
                                }
                            </p>

                        </div>
                    ))
                }

            </div>

        </div>
    );
};

export default TripList;