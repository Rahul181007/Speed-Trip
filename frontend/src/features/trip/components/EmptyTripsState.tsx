import tripIllustration from "../../../assets/tripIllustration.jpeg"
interface EmptyTripsStateProps {

    onUploadClick: () => void;
}

const EmptyTripsState = ({
    onUploadClick
}: EmptyTripsStateProps) => {

    return (

        <div
            className="
                flex
                flex-col
                items-center
                justify-center
                h-full
                text-center
                px-6
            "
        >

<div
    className="
        w-72
        h-72
        flex
        items-center
        justify-center
        mb-6
    "
>

    <img
        src={tripIllustration}
        alt="Trip Illustration"
        className="
            w-full
            h-full
            object-contain
        "
    />

</div>

            <h2
                className="
                    text-2xl
                    font-semibold
                    mb-3
                "
            >
                Welcome to Trip Management
            </h2>

            <p
                className="
                    text-gray-500
                    max-w-md
                    mb-8
                "
            >
                Upload your first trip CSV
                to visualize GPS routes,
                analytics, stoppages,
                and overspeed tracking.
            </p>

            <button
                onClick={onUploadClick}
                className="
                    bg-black
                    text-white
                    px-6
                    py-3
                    rounded-xl
                "
            >
                Upload Trip
            </button>

        </div>
    );
};

export default EmptyTripsState;