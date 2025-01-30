
//Base meal type
export interface Meal {
    firestoreMealID: string;
    //If quantity > 1, this is an array of the UUIDs of the meals.
    ids: Array<string>;
    name: string;
    description?: string;
    quantity: number;
}

//Interface for the data that is given to the view meal recipient component.
export interface MealRecipient {
    delivered : boolean;
    id : string;
    //Undefined until the meal is delivered.
    recipientName?: string;
    recipientSurname?: string;
    acceptanceImgURL?: string;
}

export interface MealsWithRecipients extends Meal {
    recipients: MealRecipient[];
}

