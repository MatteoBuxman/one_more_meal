import type { Timestamp } from "firebase/firestore";
import type { Meal } from "./meals";
import type { UserLocation } from "./location";

export interface Order {
    id: string;
    status: 'ordered' | 'picked_up' | 'completed' | 'cancelled';
    orderSize: number;
    created_at: number | Timestamp;
    updated_at: number | null | Timestamp;
    completed_at: number | null | Timestamp;
}

export interface OrderWithMeals extends Order{
    meals: Meal[];
    pickup_location: string; //The id of the added address in our database.
}