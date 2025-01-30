import type { Meal } from "$lib/types/meals";
import { v4 } from "uuid";

interface OrderBeingCreated {
  id: string;
  order_size: number;
  created_at: number;
  updated_at: number;
  placed_at?: number;
  meals: Meal[];
  is_complete: boolean;
  is_empty: boolean;
}

//This state manages the full process of creating a new order from /newmeal all the way to /newmeal/[orderID]/confirmation
export class CurrentOrderState {
  readonly order: OrderBeingCreated = $state({
    id: v4(),
    order_size: 0,
    created_at: Date.now(),
    updated_at: Date.now(),
    meals: [],
    is_complete: false,
    is_empty: true,
  });

  isLoading = $state(false); //Used to show a loading spinner when the order is being read from sessionStorage

  //This is a temporary location where a meal uuid can be stored before it is added to the order. This is used when a user is adding more 
  //than one meal to the order at a time, the initial meal ID is not part of an existing added meal but it still needs to be checked for uniqueness against an incoming uuid. The checkUniqueMealID will take this staging area into account such t
  private stagingArea: string[] = [];


  constructor() {
    //Check if the order is in local storage
    let order_from_storage : any = sessionStorage.getItem("current_order");

    if (!order_from_storage) {
      this.isLoading = false;
      return;
    }

    order_from_storage = JSON.parse(order_from_storage) as OrderBeingCreated;
    
    //Check if the order was last updated less than 15 minutes ago.
    if(order_from_storage.updated_at + 15 * 60 * 1000 < Date.now()){
      this.clearOrder();
      this.isLoading = false;
      return;
    }

    this.order = order_from_storage;
    this.isLoading = false;
  }

  //Push a new meal to the order
  pushMeal(meal: Meal) {
    this.checkUniqueMealIDs(meal);
    this.order.meals.push(meal);
    this.order.order_size += meal.quantity;
    this.order.is_empty = false;
    this.order.updated_at = Date.now();
    this.saveOrder();
  }

  pushToStagingArea(id: string){
    this.checkUniqueMealID(id);
    this.stagingArea.push(id);
  }

  //Remove a meal from the order
  removeMeal(index: number) {
    if (this.order) {
      const meal = this.order.meals.splice(index, 1);
      this.order.order_size -= meal[0].quantity;
      if(this.order.order_size === 0) this.order.is_empty = true;
      this.saveOrder();
    }
  }

  checkUniqueMealIDs(meal: Meal) {
    //Check that the uuids of the incoming meals are unique within this order.
    for (const existingMeal of this.order.meals) {
      const has_common_elements = meal.ids.some((id) =>
        existingMeal.ids.includes(id)
      );

      if (has_common_elements) {
        throw new OrderAlreadyContainsMealUUIDsError(
          "The meal you are trying to add has the same UUID as a meal already in the order."
        );
      }
    }
  }

  checkUniqueMealID(id: string){
    for (const existingMeal of this.order.meals) {
      if(existingMeal.ids.includes(id)){
        throw new OrderAlreadyContainsMealUUIDsError("The meal you are trying to add has the same UUID as a meal already in the order.");
      }
    }

    if(this.stagingArea.includes(id)){
      throw new OrderAlreadyContainsMealUUIDsError("The meal you are trying to add has the same UUID as a meal already in the order.");
    }
  }

  placeOrder() {
    this.order.placed_at = Date.now();
    this.order.is_complete = true;
    this.clearOrder();
  }

  //Clear the order
  private clearOrder() {
    sessionStorage.removeItem("current_order");
  }


  private saveOrder() {
    if (this.order) {
      sessionStorage.setItem("current_order", JSON.stringify(this.order));
    }
  }
}
