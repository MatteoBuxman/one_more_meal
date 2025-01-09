import type { Meal } from "./meals";

export interface Order {
    id: string;
    status: 'ordered' | 'picked_up' | 'completed' | 'cancelled';
    orderSize: number;
    created_at: number;
    updated_at: number | null;
    completed_at: number | null;
}

export interface OrderWithMeals extends Order{
    meals: Meal[];
}