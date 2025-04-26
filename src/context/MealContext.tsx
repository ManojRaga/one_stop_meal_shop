import React, { createContext, useContext, useState, useMemo } from 'react';
import { MealType, Dish, DailyNutrition } from '@/types/meals';

interface MealContextType {
  selectedMeals: Array<{ type: MealType; dish: Dish }>;
  dailyNutrition: DailyNutrition;
  consolidatedIngredients: { [key: string]: number };
  toggleMealSelection: (type: MealType, dish: Dish) => void;
  getSelectedMeal: (type: MealType) => Dish | undefined;
  planMeals: (meals: Array<{ type: MealType; dish: Dish }>) => void;
}

const MealContext = createContext<MealContextType | undefined>(undefined);

export function MealProvider({ children }: { children: React.ReactNode }) {
  const [selectedMeals, setSelectedMeals] = useState<Array<{ type: MealType; dish: Dish }>>([]);

  const dailyNutrition = useMemo(() => {
    return selectedMeals.reduce(
      (total, { dish }) => ({
        calories_kcal: total.calories_kcal + dish.calories_kcal,
        protein_g: total.protein_g + dish.protein_g,
        carbs_g: total.carbs_g + dish.carbs_g,
        fat_g: total.fat_g + dish.fat_g,
      }),
      { calories_kcal: 0, protein_g: 0, carbs_g: 0, fat_g: 0 }
    );
  }, [selectedMeals]);

  const consolidatedIngredients = useMemo(() => {
    const ingredients: { [key: string]: number } = {};
    selectedMeals.forEach((meal) => {
      meal.dish.ingredients.forEach((ingredient) => {
        const amount = ingredients[ingredient.name] || 0;
        ingredients[ingredient.name] = amount + ingredient.amount;
      });
    });
    return ingredients;
  }, [selectedMeals]);

  const toggleMealSelection = (type: MealType, dish: Dish) => {
    setSelectedMeals((prev) => {
      const existingIndex = prev.findIndex((meal) => meal.type === type);
      if (existingIndex >= 0) {
        if (prev[existingIndex].dish.name === dish.name) {
          return prev.filter((_, index) => index !== existingIndex);
        } else {
          const newMeals = [...prev];
          newMeals[existingIndex] = { type, dish };
          return newMeals;
        }
      }
      return [...prev, { type, dish }];
    });
  };

  const getSelectedMeal = (type: MealType) => {
    return selectedMeals.find((meal) => meal.type === type)?.dish;
  };

  const planMeals = (meals: Array<{ type: MealType; dish: Dish }>) => {
    setSelectedMeals(meals);
  };

  return (
    <MealContext.Provider
      value={{
        selectedMeals,
        dailyNutrition,
        consolidatedIngredients,
        toggleMealSelection,
        getSelectedMeal,
        planMeals,
      }}
    >
      {children}
    </MealContext.Provider>
  );
}

export function useMealContext() {
  const context = useContext(MealContext);
  if (context === undefined) {
    throw new Error('useMealContext must be used within a MealProvider');
  }
  return context;
}
