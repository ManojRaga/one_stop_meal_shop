import { createContext, useContext, useState, ReactNode } from 'react';
import { Dish, MealType, DailyNutrition } from '@/types/meals';

interface MealContextType {
  selectedMeals: Array<{ type: MealType; name: string; dish: Dish }>;
  dailyNutrition: DailyNutrition;
  consolidatedIngredients: { [key: string]: number };
  toggleMealSelection: (type: MealType, dish: Dish) => void;
  getSelectedMeal: (type: MealType) => Dish | null;
}

const defaultDailyNutrition: DailyNutrition = {
  calories_kcal: 0,
  protein_g: 0,
  carbs_g: 0,
  fat_g: 0,
};

const MealContext = createContext<MealContextType | undefined>(undefined);

export function MealProvider({ children }: { children: ReactNode }) {
  const [selectedMeals, setSelectedMeals] = useState<Array<{ type: MealType; name: string; dish: Dish }>>([]);

  const calculateDailyNutrition = (meals: Array<{ type: MealType; name: string; dish: Dish }>): DailyNutrition => {
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

  const calculateConsolidatedIngredients = (meals: Array<{ type: MealType; name: string; dish: Dish }>): { [key: string]: number } => {
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
        if (prev[existingIndex].name === dish.name) {
          return prev.filter((_, i) => i !== existingIndex);
        }
        const newMeals = [...prev];
        newMeals[existingIndex] = { type, name: dish.name, dish };
        return newMeals;
      }
      return [...prev, { type, name: dish.name, dish }];
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
