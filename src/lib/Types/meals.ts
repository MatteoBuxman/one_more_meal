
export type MealStatus = 'order placed' | 'cancelled' | 'picked up' | 'completed';

//Base meal type
export interface Meal {
    uuid: string;
    name: string;
    description?: string;
    image?: string;
}

//Type for actual placed orders. Incluides the status of the order and a creation timestamp.
export interface MealEntry extends Meal {
    status: MealStatus;
    created_at: number;
    updated_at?: number;
    completion_image?: string;
};

//The prop type for the add meal flow in the app. It includes a boolean to determine if the modal is open and a function to add a meal to the order.
export interface AddMealFlowProp {
    flowState: 0 | 1 | 2;
    addMealHandler: (meal: Meal) => void;
}