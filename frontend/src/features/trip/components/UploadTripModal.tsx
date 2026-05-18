import { useState, } from "react";
import useUploadTrip from "../hooks/useUploadTrip";

interface UploadTripModalProps{
    isOpen:boolean;
    onClose:()=>void;
    onSuccess:()=>void
}

const UploadTripModal=({isOpen,onClose,onSuccess}:UploadTripModalProps)=>{

    const {uploadTrip,loading,error}=useUploadTrip();
    const [tripName,setTripName]=useState("");
    const [file,setFile]=useState<File|null>(null);
    if(!isOpen)return null;
    const handleSubmit=async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!file)return;
     
            const formData=new FormData();
            formData.append("tripName",tripName);
            formData.append("file",file);
            await uploadTrip(formData);
            onSuccess();
            onClose();
            setTripName("")
   
    }

     return (

        <div
            className="
                fixed inset-0
                bg-black/50
                flex items-center
                justify-center
                z-50
            "
        >

            <div
                className="
                    bg-white
                    rounded-2xl
                    p-6
                    w-full
                    max-w-md
                "
            >

                <h2
                    className="
                        text-2xl
                        font-semibold
                        mb-6
                    "
                >
                    Upload Trip
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <div>

                        <label
                            className="
                                block
                                mb-2
                                text-sm
                                font-medium
                            "
                        >
                            Trip Name
                        </label>

                        <input
                            type="text"
                            value={tripName}
                            onChange={(event) =>
                                setTripName(
                                    event.target.value
                                )
                            }
                            className="
                                w-full
                                border
                                rounded-lg
                                p-3
                            "
                            placeholder="Trip name"
                        />
                    </div>

                    <div>

                        <label
                            className="
                                block
                                mb-2
                                text-sm
                                font-medium
                            "
                        >
                            CSV File
                        </label>

                        <input
                            type="file"
                            accept=".csv"
                            onChange={(event) =>

                                setFile(

                                    event.target.files?.[0]
                                    ||

                                    null
                                )
                            }
                            className="
                                w-full
                            "
                        />
                    </div>

                    {error && (

                        <p
                            className="
                                text-red-500
                                text-sm
                            "
                        >
                            {error}
                        </p>
                    )}

                    <div
                        className="
                            flex
                            justify-end
                            gap-3
                            pt-4
                        "
                    >

                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                px-4 py-2
                                rounded-lg
                                border
                            "
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                px-4 py-2
                                rounded-lg
                                bg-black
                                text-white
                            "
                        >
                            {

                                loading

                                    ? "Uploading..."

                                    : "Save"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default UploadTripModal;