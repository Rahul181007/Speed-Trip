import { useState } from "react"
import useTrips from "../hooks/useTrips";
import { useNavigate } from "react-router-dom";
import EmptyTripsState from "../components/EmptyTripsState";
import TripList from "../components/TripList";
import UploadTripModal from "../components/UploadTripModal";
import { useAuthStore } from "../../../app/store/authStore";
import { Hand } from "lucide-react";
import Navbar from "../../../components/common/Navbar";
import { logoutService } from "../../auth/services/authService";
import Spinner from "../../../components/common/Spinner";


const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trips, error, loading, fetchTrips, removeTrip } = useTrips()
  const navigate = useNavigate();
  const handleOpenTrip = (tripId: string) => {
    navigate(`/trips/${tripId}`)
  }
  const {logout}=useAuthStore()

  const handleLogout=async()=>{
    try{
      await logoutService()
       logout();
      navigate("/login")
    }catch(error:unknown){
      console.log(error)
    }
  }

  if (loading) {
    return <Spinner />
  }

   return (
        <div className="min-h-screen bg-[#F8F8F8]">
            {/* Navbar */}
      <Navbar onLogout={handleLogout} />
            <div className="max-w-6xl mx-auto px-6 py-6">

                {/* Welcome Card */}
                <div
                    className="
                        bg-white
                        border
                        rounded-xl
                        px-5
                        py-4
                        flex
                        items-center
                        gap-3
                        mb-4
                    "
                >
                    <Hand
                        className="text-yellow-400"
                        size={18}
                    />

                    <h2 className="font-semibold text-[15px]">
                        Welcome, User
                    </h2>
                </div>

                {/* Main Content */}
                <div
                    className="
                        bg-white
                        border
                        rounded-2xl
                        p-6
                        min-h-125
                    "
                >
                    {error && (
                        <p className="text-red-500 mb-4">
                            {error}
                        </p>
                    )}

                    {
                        trips.length === 0 ? (
                            <EmptyTripsState
                                onUploadClick={() =>
                                    setIsModalOpen(true)
                                }
                            />
                        ) : (
                            <>
                                {/* Upload Top Bar */}
                                <div className="flex items-center gap-4 mb-6">
                                    <button
                                        onClick={() =>
                                            setIsModalOpen(true)
                                        }
                                        className="
                                            bg-[#102B3F]
                                            text-white
                                            px-5
                                            py-2.5
                                            rounded-md
                                            text-sm
                                            font-medium
                                        "
                                    >
                                        Upload Trip
                                    </button>

                                    <p className="text-sm text-gray-400">
                                        Upload the Excel sheet of your trip
                                    </p>
                                </div>

                                <TripList
                                    trips={trips}
                                    onDelete={removeTrip}
                                    onOpen={handleOpenTrip}
                                />
                            </>
                        )
                    }
                </div>
            </div>

            <UploadTripModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchTrips}
            />
        </div>
    );
};

export default DashboardPage;