
//Base meal type
export interface Meal {
    uuid: string;
    name: string;
    description?: string;
    quantity: number;
}

export interface CompletedMeal extends Meal{
    //If there were multiple meals in the delivery, this is an array of the acceptance images.
    acceptanceImgURL: string | Array<string>;
}


export interface OneMoreMealPackagingFlowState {
    stateIndex : 0 | 1 | 2;
    addedMeals : Meal[];
}

