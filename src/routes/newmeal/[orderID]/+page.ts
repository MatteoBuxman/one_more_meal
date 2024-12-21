import type { PageLoad } from './$types';
import type { MealEntry } from '$lib/Types/meals';

const mockMeals: MealEntry[] = [
  {
    uuid: '1a2b3c4d-5e6f-7g8h-9i0j',
    name: 'Grilled Chicken Bowl',
    description: 'Fresh grilled chicken served over brown rice with seasonal vegetables',
    image: '/placeholder.svg?height=200&width=200',
    status: 'order placed',
    created_at: Date.now() - 1000 * 60 * 30, // 30 minutes ago
  },
  {
    uuid: '2b3c4d5e-6f7g-8h9i-0j1k',
    name: 'Vegetarian Buddha Bowl',
    description: 'Quinoa base with roasted chickpeas, sweet potato, kale, and tahini dressing',
    image: '/placeholder.svg?height=200&width=200',
    status: 'order placed',
    created_at: Date.now() - 1000 * 60 * 25, // 25 minutes ago
  },
  {
    uuid: '3c4d5e6f-7g8h-9i0j-1k2l',
    name: 'Salmon Poke Bowl',
    description: 'Fresh salmon, avocado, cucumber, and edamame on sushi rice',
    image: '/placeholder.svg?height=200&width=200',
    status: 'order placed',
    created_at: Date.now() - 1000 * 60 * 20, // 20 minutes ago
  },
  {
    uuid: '4d5e6f7g-8h9i-0j1k-2l3m',
    name: 'Mediterranean Wrap',
    status: 'order placed',
    created_at: Date.now() - 1000 * 60 * 15, // 15 minutes ago
  },
  {
    uuid: '5e6f7g8h-9i0j-1k2l-3m4n',
    name: 'Tofu Stir-Fry Bowl',
    description: 'Crispy tofu with mixed vegetables in a ginger-soy sauce',
    image: '/placeholder.svg?height=200&width=200',
    status: 'order placed',
    created_at: Date.now() - 1000 * 60 * 10, // 10 minutes ago
  }
];

export const load: PageLoad = async ({ params }) => {
  // In a real application, you would fetch this data from an API
  // For development, we're using our mock data
  return {
    meals: mockMeals,
    orderID: params.orderID
  };
};