import type { OpenOrder, ClosedOrder } from "$lib/Types/orders";
import type { PageLoad } from "./$types";

const openOrders: OpenOrder[] = [
    {
      id: "ORD-001",
      status: "ordered",
      meals: [
        {
          uuid: ["MEAL-001", "MEAL-002"],
          name: "Chicken Tikka Masala",
          description: "Creamy curry with grilled chicken",
          quantity: 2
        },
        {
          uuid: ["MEAL-002", "MEAL-003", "MEAL-004"],
          name: "Naan Bread",
          quantity: 3
        }
      ],
      created_at: 1736080853969 - 1000000, 
    },
    {
      id: "ORD-002",
      status: "picked_up",
      meals: [
        {
          uuid: ["MEAL-003"],
          name: "Vegetable Biryani",
          description: "Mixed vegetables with aromatic rice",
          quantity: 1
        }
      ],
      created_at: 1736080853969 - 100000000, // Jan 6, 2024
      updated_at: 1704502800000  // Jan 6, 2024
    },
    {
      id: "ORD-003",
      status: "ordered",
      meals: [
        {
          uuid: ["MEAL-004", "MEAL-005"],
          name: "Butter Chicken",
          quantity: 2
        },
        {
          uuid: ["MEAL-005", "MEAL-006", "MEAL-007", "MEAL-008"],
          name: "Garlic Naan",
          description: "Naan bread with garlic butter",
          quantity: 4
        }
      ],
      created_at: 1736080853969 - 600000000  // Jan 6, 2024
    }
  ];
  
  const closedOrders: ClosedOrder[] = [
    {
      id: "ORD-101",
      status: "completed",
      meals: [
        {
          uuid: ["MEAL-101"],
          name: "Palak Paneer",
          description: "Spinach curry with cottage cheese",
          quantity: 1,
          acceptanceImgURL: ["https://example.com/images/order101-acceptance.jpg"]
        }
      ],
      created_at: 1704409200000,  // Jan 5, 2024
      completed_at: 1704412800000 // Jan 5, 2024
    },
    {
      id: "ORD-102",
      status: "cancelled",
      meals: [
        {
          uuid: ["MEAL-102", "MEAL-103"],
          name: "Chicken Korma",
          quantity: 2,
          acceptanceImgURL: ["https://example.com/images/order102-1.jpg", "https://example.com/images/order102-2.jpg"]
        },
        {
          uuid: ["MEAL-103", "MEAL-104"],
          name: "Plain Rice",
          quantity: 2,
          acceptanceImgURL: ["https://example.com/images/order102-3.jpg"]
        }
      ],
      created_at: 1704412800000,  // Jan 5, 2024
      completed_at: 1704416400000 // Jan 5, 2024
    },
    {
      id: "ORD-103",
      status: "completed",
      meals: [
        {
          uuid: ["MEAL-104", "MEAL-105", "MEAL-106"],
          name: "Dal Makhani",
          description: "Creamy black lentils",
          quantity: 3,
          acceptanceImgURL: ["https://example.com/images/order103-1.jpg", "https://example.com/images/order103-2.jpg", "https://example.com/images/order103-3.jpg"]
        }
      ],
      created_at: 1704416400000,  // Jan 5, 2024
      completed_at: 1704420000000 // Jan 5, 2024
    }
  ];

export const load: PageLoad = () => {
    return {
        orders: {
            openOrders,
            closedOrders
        }
    }
};
