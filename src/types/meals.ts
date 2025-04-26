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

export interface DailyNutrition {
  calories_kcal: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
}

export interface SelectedMeal {
  type: MealType;
  dish: Dish;
}

export interface MealData {
  dishes: {
    [key in MealType]: Dish[];
  };
  products: Array<{
    product: string;
    quantity: string;
    description: string;
  }>;
}
