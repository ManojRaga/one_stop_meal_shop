export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface Dish {
  name: string;
  calories_kcal: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  ingredients: {
    [key: string]: number;
  };
}

export interface Product {
  product: string;
  quantity: string;
  description: string;
}

export interface MealData {
  dishes: {
    breakfast: Dish[];
    lunch: Dish[];
    dinner: Dish[];
    snack: Dish[];
  };
  products: Product[];
}

export interface SelectedMeal {
  type: MealType;
  dish: Dish;
}

export interface DailyNutrition {
  calories_kcal: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
}
