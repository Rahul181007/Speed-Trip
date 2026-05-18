import { TripDetailsResponseDTO } from "../../dto/trip/TripDetailsResponseDTO";

export interface IGetTripDetails{
    execute(tripId:string):Promise<TripDetailsResponseDTO>
}