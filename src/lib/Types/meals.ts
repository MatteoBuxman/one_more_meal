
export type MealStatus = 'order placed' | 'cancelled' | 'picked up' | 'completed';

//Base meal type
export interface Meal {
    uuid: string;
    name: string;
    description?: string;
    amount: number;
}

//Type for actual placed orders. Incluides the status of the order and a creation timestamp.
export interface MealEntry extends Meal {
    status: MealStatus;
    created_at: number;
    updated_at?: number;
    completion_image?: string;
};

export interface OneMoreMealPackagingFlowState {
    stateIndex : 0 | 1 | 2;
    addedMeals : Meal[];
}