import {z} from "zod";

export const uploadTripSchema=z.object({
    tripName:z.string().trim().min(1,"Trip name is required")
})