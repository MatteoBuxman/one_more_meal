
//Base meal type
export interface Meal {
    //If quantity > 1, this is an array of the UUIDs of the meals.
    uuid: Array<string>;
    name: string;
    description?: string;
    quantity: number;
}

export interface CompletedMeal extends Meal{
    //If there were multiple meals in the delivery, this is an array of the acceptance images.
    acceptanceImgURL: Array<string>;
}


export interface OneMoreMealPackagingFlowState {
    stateIndex : 0 | 1 | 2;
    addedMeals : Meal[];
}

//Interface for the data that is given to the view meal recipient component.
export interface MealRecipient {
    mealDeliveredStatus : 'delivered' | 'not_delivered' | 'cancelled';
    mealUUID : string;
    //Undefined until the meal is delivered.
    recipientName?: string;
    acceptanceImgURL?: string;
}

