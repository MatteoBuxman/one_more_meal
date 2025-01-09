import { reconcileMealsWithRecipientInformation } from "$lib/Logic/reconcile_meals_with_recipient_information";
import type { DashboardSnapshot } from "$lib/Types/dashboard";
import type { Meal, MealRecipient, MealsWithRecipients } from "$lib/Types/meals";
import type { Order } from "$lib/Types/orders";
import { collection, Firestore, getDocs, QuerySnapshot, Timestamp } from "firebase/firestore";

const PRODUCTION = false;

const parseSnapshotDataAsOrder = (snapshot: QuerySnapshot) : Order[] => {
    const orders = snapshot.docs.map(doc => {

        const orderData = doc.data();

        const order : Order = {
            id: doc.id,
            status: orderData.status,
            orderSize: orderData.orderSize,
            created_at: (orderData.created_at as Timestamp).toMillis(),
            updated_at: (orderData.updated_at as Timestamp).toMillis() || null,
            completed_at: (orderData.completed_at as Timestamp) ? orderData.completed_at.toMillis() : null
        }

        return order;
    });
    return orders;
}

const parseSnapshotDataAsMeals = (snapshot: QuerySnapshot) : Meal[] => {
    const meals = snapshot.docs.map(doc => {
        const mealData = doc.data();
        const meal : Meal = {
            firestoreMealID: doc.id,
            ids: mealData.meal_IDs,
            name: mealData.name,
            description: mealData.description || null,
            quantity: mealData.quantity
        }
        return meal;
    });
    return meals;
}

const parseSnapshotDataAsMealRecipients = (snapshot: QuerySnapshot) : MealRecipient[] => { 
    const recipients = snapshot.docs.map(doc => {
        const recipientData = doc.data();
        const recipient : MealRecipient = {
            delivered: recipientData.delivered,
            id: doc.id,
            recipientName: recipientData.recipientName || null,
            recipientSurname: recipientData.recipientSurname || null,
            acceptanceImgURL: recipientData.acceptanceImgURL || null
        }
        return recipient;
    });
    return recipients;
}

//Fetch user orders for the dashboard page.
export const fetchUserOpenOrders = async (firestore: Firestore, userUUID: string) : Promise<Order[]> => {

    //Handle open order fetching.
    const docPath = collection(firestore, `Orders/${userUUID}/openOrders`);
    const openOrders = getDocs(docPath);

    return new Promise<Order[]>((resolve, reject) => {
        openOrders.then(snapshot => {
            const orders = parseSnapshotDataAsOrder(snapshot);
            !PRODUCTION ? setTimeout(() => resolve(orders), 1200) : resolve(orders);
        }).catch(err => {
            !PRODUCTION ? setTimeout(() => reject(err), 1200) : reject(err);
        });
    });
}

//Fetch user orders for the dashboard page.
export const fetchUserCompletedOrders = async (firestore: Firestore, userUUID: string) : Promise<Order[]> => {

    //Handle open order fetching.
    const docPath = collection(firestore, `Orders/${userUUID}/completedOrders`);
    const openOrders = getDocs(docPath);

    return new Promise<Order[]>((resolve, reject) => {
        openOrders.then(snapshot => {
            const orders = parseSnapshotDataAsOrder(snapshot);
            !PRODUCTION ? setTimeout(() => resolve(orders), 1200) : resolve(orders);
        }).catch(err => {
            !PRODUCTION ? setTimeout(() => reject(err), 1200) : reject(err);
        });
    });
}

export const fetchOrderMeals = async (firestore: Firestore, orderID: string) : Promise<Meal[]> => {
    const docPath = collection(firestore, `Meals/${orderID}/meals`);
    const order = getDocs(docPath);

    return new Promise<Meal[]>((resolve, reject) => {
        order.then(snapshot => {
            const meals = parseSnapshotDataAsMeals(snapshot);
            !PRODUCTION ? setTimeout(() => resolve(meals), 1200) : resolve(meals);
        }).catch(err => {
            !PRODUCTION ? setTimeout(() => reject(err), 1200) : reject(err);
        });
    });
}

//Fetches all recipient information for a given order and then combines the order meals with each individual meal UUID
export const fetchMealRecipientInfo = async (firestore: Firestore, orderID: string, meals: Meal[]) : Promise<MealsWithRecipients[]> => {
    const docPath = collection(firestore, `Meals/${orderID}/recipients`);
    const order = getDocs(docPath);

    return new Promise<MealsWithRecipients[]>((resolve, reject) => {
        order.then(snapshot => {

            const recipients = parseSnapshotDataAsMealRecipients(snapshot);
            const returnVal = reconcileMealsWithRecipientInformation(meals, recipients);

            !PRODUCTION ? setTimeout(() => resolve(returnVal), 1200) : resolve(returnVal);

        }).catch(err => {
            !PRODUCTION ? setTimeout(() => reject(err), 1200) : reject(err);
        });
    });
}

    
