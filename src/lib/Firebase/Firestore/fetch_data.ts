import { reconcileMealsWithRecipientInformation } from "$lib/Logic/reconcile_meals_with_recipient_information";
import type {
  Meal,
  MealRecipient,
  MealsWithRecipients,
} from "$lib/types/meals";
import type { Order } from "$lib/types/orders";
import {
  collection,
  Firestore,
  getDocs,
  QuerySnapshot,
  Timestamp,
} from "firebase/firestore";
//Production or Development mode
import { PUBLIC_PRODUCTION } from "$lib/Logic/production_state";
import { FirebaseError } from "firebase/app";
import type { UserLocation } from "$lib/types/location";

const parseSnapshotDataAsOrder = (snapshot: QuerySnapshot): Order[] => {
  const orders = snapshot.docs.map((doc) => {
    const orderData = doc.data();

    const order: Order = {
      id: doc.id,
      status: orderData.status,
      orderSize: orderData.orderSize,
      created_at: (orderData.created_at as Timestamp).toMillis(),
      updated_at: (orderData.updated_at as Timestamp)
        ? orderData.updated_at.toMillis()
        : null,
      completed_at: (orderData.completed_at as Timestamp)
        ? orderData.completed_at.toMillis()
        : null,
    };

    return order;
  });
  return orders;
};

const parseSnapshotDataAsMeals = (snapshot: QuerySnapshot): Meal[] => {
  const meals = snapshot.docs.map((doc) => {
    const mealData = doc.data();
    const meal: Meal = {
      firestoreMealID: doc.id,
      ids: mealData.meal_IDs,
      name: mealData.name,
      description: mealData.description || null,
      quantity: mealData.quantity,
    };
    return meal;
  });
  return meals;
};

const parseSnapshotDataAsMealRecipients = (
  snapshot: QuerySnapshot
): MealRecipient[] => {
  const recipients = snapshot.docs.map((doc) => {
    const recipientData = doc.data();
    const recipient: MealRecipient = {
      delivered: recipientData.delivered,
      id: doc.id,
      recipientName: recipientData.recipientName || null,
      recipientSurname: recipientData.recipientSurname || null,
      acceptanceImgURL: recipientData.acceptanceImgURL || null,
    };
    return recipient;
  });
  return recipients;
};

//Fetch user orders for the dashboard page.
export const fetchUserOpenOrders = async (
  firestore: Firestore,
  userUUID: string
): Promise<Order[]> => {
  try {
    if (!userUUID) {
      throw new Error("User UUID is required");
    }

    const docPath = collection(firestore, `Orders/${userUUID}/openOrders`);
    const snapshot = await getDocs(docPath);
    const orders = parseSnapshotDataAsOrder(snapshot);
    orders.sort((a, b) => (b.created_at as number) - (a.created_at as number));

    console.log("Timestamp of first", orders[0].created_at);

    if (!PUBLIC_PRODUCTION) {
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }

    return orders;
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "permission-denied":
          throw new Error("You do not have permission to view these open orders");
        case "not-found":
          throw new Error("Not found in database.");
        default:
          throw new Error("Failed to fetch open orders");
      }
    }
    throw error;
  }
};

//Fetch user orders for the dashboard page.
export const fetchUserCompletedOrders = async (
  firestore: Firestore,
  userUUID: string
): Promise<Order[]> => {
  try {
    if (!userUUID) {
      throw new Error("User UUID is required");
    }

    const docPath = collection(firestore, `Orders/${userUUID}/completedOrders`);
    const snapshot = await getDocs(docPath);
    const orders = parseSnapshotDataAsOrder(snapshot);
    orders.sort((a, b) => (b.created_at as number) - (a.created_at as number));

    if (!PUBLIC_PRODUCTION) {
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }

    return orders;
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "permission-denied":
          throw new Error("You do not have permission to view these completed orders");
        case "not-found":
          throw new Error("Orders not found in the database.");
        default:
          throw new Error("Failed to fetch orders.");
      }
    }
    throw error;
  }
};

export const fetchOrderMeals = async (
  firestore: Firestore,
  orderID: string
): Promise<Meal[]> => {
  try {
    if (!orderID) {
      throw new Error("Order ID is required");
    }

    const docPath = collection(firestore, `Meals/${orderID}/meals`);
    const snapshot = await getDocs(docPath);
    const meals = parseSnapshotDataAsMeals(snapshot);

    if (!PUBLIC_PRODUCTION) {
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }

    return meals;
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "permission-denied":
          throw new Error("You do not have permission to view these meals");
        case "not-found":
          return [];
        default:
          throw new Error("Failed to fetch meals.");
      }
    }
    throw error;
  }
};

//Fetches all recipient information for a given order and then combines the order meals with each individual meal UUID
export const fetchMealRecipientInfo = async (
  firestore: Firestore,
  orderID: string,
  meals: Meal[]
): Promise<MealsWithRecipients[]> => {
  try {
    if (!orderID) {
      throw new Error("Order ID is required");
    }
    if (!meals || !Array.isArray(meals)) {
      throw new Error("Valid meals array is required");
    }

    const docPath = collection(firestore, `Meals/${orderID}/recipients`);
    const snapshot = await getDocs(docPath);
    const recipients = parseSnapshotDataAsMealRecipients(snapshot);
    const mealsWithRecipients = reconcileMealsWithRecipientInformation(
      meals,
      recipients
    );

    if (!PUBLIC_PRODUCTION) {
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }

    return mealsWithRecipients;
  } catch (error) {
    console.error("Error fetching meal recipient info:", error);
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "permission-denied":
          throw new Error(
            "You do not have permission to view recipient information"
          );
        case "not-found":
          throw new Error("Recipient information not found");
        default:
          throw new Error("Failed to fetch recipient information");
      }
    }
    throw error;
  }
};


export const fetchUserAddresses =  async (firestore: Firestore, userUUID: string) : Promise<UserLocation[]> => {
  try {

    if (!userUUID) {
      throw new Error("User UUID is required");
    }

    const docPath = collection(firestore, `Users/${userUUID}/addresses`);
    const snapshot = await getDocs(docPath);
    let addresses = snapshot.docs.map((doc) => {
      const addressData = doc.data();
      const address: UserLocation = {
        address_id: doc.id,
        name: addressData.name,
        phone_number: addressData.phone_number,
        isDefault: addressData.isDefault,
        city: addressData.city,
        postal_code: addressData.postal_code,
        province: addressData.province,
        street: addressData.street,
        suburb: addressData.suburb,
        full_address: addressData.full_address,
        mapbox_id: addressData.mapbox_id,
      };
      return address;
    });

    // if (!PUBLIC_PRODUCTION) {
    //   await new Promise((resolve) => setTimeout(resolve, 1200));
    // }

    
    //Place defaultAddress first.
    const defaultAddress = addresses.findIndex((address) => address.isDefault);

    if (addresses.length > 1) {
      
      const temp = addresses[0];
      addresses[0] = addresses[defaultAddress];
      addresses[defaultAddress] = temp;
    }

    return addresses;
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "permission-denied":
          throw new Error("You do not have permission to view these addresses");
        case "not-found":
          throw new Error("Addresses not found in the database.");
        default:
          throw new Error("Failed to fetch addresses.");
      }
    }
    throw error;
  }
}