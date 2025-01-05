import type { CompletedMeal, Meal } from "./meals";

export interface OpenOrder {
    id: string;
    status: 'ordered' | 'picked_up';
    description?: string;
    meals: Array<Meal>;
    created_at: number;
    updated_at?: number;
}

export interface ClosedOrder {
    id: string;
    status: 'completed' | 'cancelled';
    description?: string;
    meals: Array<CompletedMeal>;
    created_at: number;
    completed_at: number;
}