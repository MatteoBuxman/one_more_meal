//Methods which post data to firestore.

import type { MealRecipient } from "$lib/Types/meals";
import type { OrderWithMeals } from "$lib/Types/orders";
import { collection, doc, setDoc, writeBatch, type Firestore } from "firebase/firestore";

//Post a new order to the firestore.
export const postOrder = async (firestore: Firestore, userUUID:string,  order: OrderWithMeals) : Promise<void> => {
    try {
        
        const orderDoc = {
            created_at: order.created_at,
            orderSize: order.orderSize,
            status: order.status,
            updated_at: order.updated_at,
            completed_at: order.completed_at,
        }

        const orderDocPath = doc(firestore, `Orders/${userUUID}/openOrders/${order.id}`);

        await setDoc(orderDocPath, orderDoc);

        //Add meals to the meals collection
        const mealDocPath = collection(firestore, `Meals/${order.id}/meals`);
        const recipientDocPath = collection(firestore, `Meals/${order.id}/recipients`);

        //A new order obviously has no recipient information.
        const recipientDoc : MealRecipient = {
            delivered: false,
            recipientName: "",
            recipientSurname: "",
            acceptanceImgURL: "",
            id: ""
        }

        const batch = writeBatch(firestore);

        //Add all meals to a batch commit
        order.meals.forEach((meal) => {
            const mealDoc = {
                meal_IDs: meal.ids,
                name: meal.name,
                description: meal.description || "",
                quantity: meal.quantity
            }

            batch.set(doc(mealDocPath), mealDoc);
            
            meal.ids.forEach(id=> batch.set(doc(recipientDocPath, id), recipientDoc));
        });

        //Commit the batch
        await batch.commit();


    } catch (error) {
        throw new Error(`Error posting order: ${error}`);
    }
}