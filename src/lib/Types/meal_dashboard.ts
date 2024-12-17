
export type MealStatus = 'order placed' | 'cancelled' | 'picked up' | 'completed';

export type MealEntry = {
    uuid: string;
    name: string;
    description?: string;
    image?: string;
    status: MealStatus;
    created_at: number;
    updated_at?: number;
    completion_image?: string;
};