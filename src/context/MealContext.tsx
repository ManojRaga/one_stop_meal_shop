import { createContext, useContext, useState, ReactNode } from 'react';
import { Dish, MealType, SelectedMeal, DailyNutrition } from '@/types/meals';

interface MealContextType {
  selectedMeals: SelectedMeal[];
  dailyNutrition: DailyNutrition;
  toggleMealSelection: (type: MealType, dish: Dish) => void;
  getSelectedMeal: (type: MealType) => Dish | null;
  consolidatedIngredients: { [key: string]: number };
}

const defaultDailyNutrition: DailyNutrition = {
  calories_kcal: 0,
  protein_g: 0,
  carbs_g: 0,
  fat_g: 0,
};

const MealContext = createContext<MealContextType | undefined>(undefined);

export function MealProvider({ children }: { children: ReactNode }) {
  const [selectedMeals, setSelectedMeals] = useState<SelectedMeal[]>([]);

  const calculateDailyNutrition = (meals: SelectedMeal[]): DailyNutrition => {
    return meals.reduce(
      (total, meal) => ({
        calories_kcal: total.calories_kcal + meal.dish.calories_kcal,
        protein_g: total.protein_g + meal.dish.protein_g,
        carbs_g: total.carbs_g + meal.dish.carbs_g,
        fat_g: total.fat_g + meal.dish.fat_g,
      }),
      { ...defaultDailyNutrition }
    );
  };

  const calculateConsolidatedIngredients = (meals: SelectedMeal[]): { [key: string]: number } => {
    return meals.reduce((total, meal) => {
      Object.entries(meal.dish.ingredients).forEach(([ingredient, amount]) => {
        total[ingredient] = (total[ingredient] || 0) + amount;
      });
      return total;
    }, {} as { [key: string]: number });
  };

  const toggleMealSelection = (type: MealType, dish: Dish) => {
    setSelectedMeals((prev) => {
      const existingIndex = prev.findIndex((meal) => meal.type === type);
      if (existingIndex >= 0) {
        // If selecting the same dish, remove it; if different dish, replace it
        if (prev[existingIndex].dish.name === dish.name) {
          const newMeals = prev.filter((_, index) => index !== existingIndex);
          return newMeals;
        } else {
          const newMeals = [...prev];
          newMeals[existingIndex] = { type, dish };
          return newMeals;
        }
      } else {
        // Add new selection
        return [...prev, { type, dish }];
      }
    });
  };

  const getSelectedMeal = (type: MealType): Dish | null => {
    const meal = selectedMeals.find((meal) => meal.type === type);
    return meal ? meal.dish : null;
  };

  const value = {
    selectedMeals,
    dailyNutrition: calculateDailyNutrition(selectedMeals),
    consolidatedIngredients: calculateConsolidatedIngredients(selectedMeals),
    toggleMealSelection,
    getSelectedMeal,
  };

  return <MealContext.Provider value={value}>{children}</MealContext.Provider>;
}

export function useMealContext() {
  const context = useContext(MealContext);
  if (context === undefined) {
    throw new Error('useMealContext must be used within a MealProvider');
  }
  return context;
}
