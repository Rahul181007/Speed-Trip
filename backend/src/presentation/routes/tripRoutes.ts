import { Router } from "express";
import { verifyAccessToken } from "../middleware/verifyAccessToken";
import { upload } from "../../infrastructure/setvice/multerConfig";
import { validate } from "../middleware/validate";
import { uploadTripSchema } from "../validators/trip/uploadTripValidator";
import { tripController } from "../../di/tripCOntainer";

const router=Router();
router.post("/upload",verifyAccessToken,upload.single("file"),validate(uploadTripSchema),tripController.uploadTrip);
router.get("/",verifyAccessToken,tripController.getUserTrips);
router.get("/:tripId",verifyAccessToken,tripController.getTripDetails);
router.delete("/:tripId",verifyAccessToken,tripController.deleteTrip)

export default router