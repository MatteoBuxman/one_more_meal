import type { Timestamp } from "firebase/firestore";
import type { Meal } from "./meals";

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
}