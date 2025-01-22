import type { Meal, MealRecipient, MealsWithRecipients } from "$lib/types/meals";


export const reconcileMealsWithRecipientInformation = (meals: Meal[], recipients: MealRecipient[]) : MealsWithRecipients[] => {
    const mealsWithRecipients = meals.map(meal => {
        const mealRecipients = recipients.filter(recipient => meal.ids.includes(recipient.id));
        const mealWithRecipients : MealsWithRecipients = {
            ...meal,
            recipients: mealRecipients
        }
        return mealWithRecipients;
    });
    return mealsWithRecipients;
}