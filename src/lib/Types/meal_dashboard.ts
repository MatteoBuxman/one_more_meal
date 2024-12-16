export type MealEntry = {
    uuid: string;
    name: string;
    description?: string;
    image?: string;
    status: string;
    created_at: number;
    updated_at?: number;
};