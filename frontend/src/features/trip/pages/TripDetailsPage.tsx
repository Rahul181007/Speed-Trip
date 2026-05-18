import { useNavigate, useParams } from "react-router-dom"
import useTripDetails from "../hooks/useTripDetails"
import Spinner from "../../../components/common/Spinner"
import { useState } from "react"
import TripMap from "../components/TripMap"
import Navbar from "../../../components/common/Navbar"
import { useAuthStore } from "../../../app/store/authStore"
import { logoutService } from "../../auth/services/authService"

const TripDetailsPage = () => {
    const { tripId } = useParams()
    const { trip, loading } = useTripDetails(tripId || "");
    const [selectedSegmentIndex, setSelectedSegmentIndex] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1)
    const { logout } = useAuthStore()
    const navigate = useNavigate()

    if (!tripId) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-900">Trip ID Missing</h2>
                    <p className="text-gray-500 mt-2">Unable to load trip details.</p>
                </div>
            </div>
        )
    }

    if (loading) {
        return <Spinner />
    }
    if (!trip) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-900">Trip Not Found</h2>
                    <p className="text-gray-500 mt-2">The requested trip could not be located.</p>
                </div>
            </div>
        )
    }

    const handleLogout = async () => {
        try {
            await logoutService()
            logout();
            navigate("/login")
        } catch (error: unknown) {
            console.log(error)
        }
    }

    const handleBack = () => {
        navigate(-1) // Go back to previous page
    }

    const activeSegment = selectedSegmentIndex !== null ? trip?.segments.find((segment) => segment.segmentIndex === selectedSegmentIndex) : null;
    const filteredTripPoints = activeSegment ? trip.tripPoints.slice(activeSegment.startPointIndex, activeSegment.endPointIndex + 1) : trip?.tripPoints

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredTripPoints?.length / itemsPerPage);
    const paginatedPoints = filteredTripPoints?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar onLogout={handleLogout} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header with Back Button */}
                <div className="mb-6">
                    <button
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mb-4"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                    </button>
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h1 className="text-2xl font-semibold text-gray-900">{trip.tripName}</h1>
                        <p className="text-sm text-gray-500 mt-1">Trip ID: {tripId}</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
                    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                        <p className="text-sm font-medium text-gray-500">Total Distance</p>
                        <p className="text-2xl font-bold text-gray-900 mt-2">{trip.totalDistance.toFixed(2)} <span className="text-sm font-normal text-gray-500">KM</span></p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                        <p className="text-sm font-medium text-gray-500">Total Duration</p>
                        <p className="text-2xl font-bold text-gray-900 mt-2">{trip.totalDuration.toFixed(2)} <span className="text-sm font-normal text-gray-500">Min</span></p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                        <p className="text-sm font-medium text-gray-500">Idle Time</p>
                        <p className="text-2xl font-bold text-gray-900 mt-2">{trip.totalIdleDuration.toFixed(2)} <span className="text-sm font-normal text-gray-500">Min</span></p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                        <p className="text-sm font-medium text-gray-500">Stoppage Time</p>
                        <p className="text-2xl font-bold text-gray-900 mt-2">{trip.totalStoppageDuration.toFixed(2)} <span className="text-sm font-normal text-gray-500">Min</span></p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                        <p className="text-sm font-medium text-gray-500">Overspeed Time</p>
                        <p className="text-2xl font-bold text-red-600 mt-2">{trip.overspeedDuration.toFixed(2)} <span className="text-sm font-normal text-gray-500">Min</span></p>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mb-8 bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                        <h2 className="font-semibold text-gray-900">Route Map</h2>
                        <p className="text-xs text-gray-500 mt-0.5">Interactive map with trip visualization</p>
                    </div>
                    <div className="p-1">
                        <TripMap tripPoints={filteredTripPoints} />
                    </div>
                </div>

                {/* Segment Filter */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-gray-900">Trip Segments</h2>
                        <p className="text-xs text-gray-500">Click on a segment to filter points</p>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        <button
                            onClick={() => {
                                setSelectedSegmentIndex(null)
                                setCurrentPage(1)
                            }}
                            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap shadow-sm ${
                                selectedSegmentIndex === null
                                    ? "bg-gray-900 text-white shadow-md"
                                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                            }`}
                        >
                            All Segments
                        </button>
                        {trip.segments.map((segment) => (
                            <button
                                key={segment.segmentIndex}
                                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap shadow-sm ${
                                    selectedSegmentIndex === segment.segmentIndex
                                        ? "bg-gray-900 text-white shadow-md"
                                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                                }`}
                                onClick={() => {
                                    setSelectedSegmentIndex(segment.segmentIndex)
                                    setCurrentPage(1)
                                }}
                            >
                                Segment {segment.segmentIndex}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Data Table and Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Table */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latitude</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Longitude</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Speed</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {paginatedPoints?.map((point) => (
                                        <tr key={point.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900">{new Date(point.timestamp).toLocaleTimeString()}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 font-mono">{point.latitude}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 font-mono">{point.longitude}</td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{point.speed.toFixed(2)} <span className="text-xs text-gray-500">KM/H</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Summary Panel */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Segment Summary</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                <span className="text-sm text-gray-600">Duration</span>
                                <span className="font-semibold text-gray-900">{activeSegment ? activeSegment.duration.toFixed(2) : trip.totalDuration.toFixed(2)} <span className="text-xs text-gray-500">Min</span></span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                <span className="text-sm text-gray-600">Distance</span>
                                <span className="font-semibold text-gray-900">{activeSegment ? activeSegment.distance.toFixed(2) : trip.totalDistance.toFixed(2)} <span className="text-xs text-gray-500">KM</span></span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                <span className="text-sm text-gray-600">Stoppage Duration</span>
                                <span className="font-semibold text-gray-900">{activeSegment ? activeSegment.stoppageDuration.toFixed(2) : trip.totalStoppageDuration.toFixed(2)} <span className="text-xs text-gray-500">Min</span></span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                <span className="text-sm text-gray-600">Idle Duration</span>
                                <span className="font-semibold text-gray-900">{activeSegment ? activeSegment.idleDuration.toFixed(2) : trip.totalIdleDuration.toFixed(2)} <span className="text-xs text-gray-500">Min</span></span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-sm text-gray-600">Overspeed Duration</span>
                                <span className="font-semibold text-red-600">{activeSegment ? activeSegment.overspeedDuration.toFixed(2) : trip.overspeedDuration.toFixed(2)} <span className="text-xs text-red-400">Min</span></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-8">
                    <div className="text-sm text-gray-500">
                        Showing {filteredTripPoints?.length ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
                        {Math.min(currentPage * itemsPerPage, filteredTripPoints?.length || 0)} of{' '}
                        {filteredTripPoints?.length || 0} entries
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Previous
                        </button>
                        <div className="flex gap-1">
                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }
                                
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                                            currentPage === pageNum
                                                ? "bg-gray-900 text-white shadow-sm"
                                                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TripDetailsPage