import React, { useState } from 'react';
import { Dish, MealType } from '@/types/meals';

interface SmartMealPlannerProps {
  onClose: () => void;
  dishes: {
    [key in MealType]: Dish[];
  };
  onPlanMeals: (selectedDishes: { type: MealType; dish: Dish }[]) => void;
}

export default function SmartMealPlanner({ onClose, dishes, onPlanMeals }: SmartMealPlannerProps) {
  const [calorieTarget, setCalorieTarget] = useState(2000);
  const [proteinTarget, setProteinTarget] = useState(100);
  const [loading, setLoading] = useState(false);

  const findOptimalMeals = () => {
    setLoading(true);
    
    // Convert all dishes to a flat array with their meal type
    const allDishes = Object.entries(dishes).map(([type, typesDishes]) =>
      typesDishes.map(dish => ({ type: type as MealType, dish }))
    ).flat();

    // Simple scoring function based on how close we get to targets
    const scoreMealPlan = (mealPlan: { type: MealType; dish: Dish }[]) => {
      const totalCalories = mealPlan.reduce((sum, { dish }) => sum + dish.calories_kcal, 0);
      const totalProtein = mealPlan.reduce((sum, { dish }) => sum + dish.protein_g, 0);
      
      // Calculate how close we are to targets (lower score is better)
      const calorieScore = Math.abs(totalCalories - calorieTarget);
      const proteinScore = Math.abs(totalProtein - proteinTarget);
      
      return calorieScore + (proteinScore * 20); // Weight protein difference more heavily
    };

    // Find one dish for each meal type that gets us closest to our targets
    const mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];
    let bestPlan = mealTypes.map(type => ({
      type,
      dish: dishes[type][0] // Start with first dish of each type
    }));
    let bestScore = scoreMealPlan(bestPlan);

    // Try different combinations (simplified for performance)
    for (const type of mealTypes) {
      for (const dish of dishes[type]) {
        const newPlan = [...bestPlan];
        const typeIndex = newPlan.findIndex(m => m.type === type);
        newPlan[typeIndex] = { type, dish };
        
        const score = scoreMealPlan(newPlan);
        if (score < bestScore) {
          bestScore = score;
          bestPlan = newPlan;
        }
      }
    }

    setTimeout(() => {
      setLoading(false);
      onPlanMeals(bestPlan);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl m-4" onClick={e => e.stopPropagation()}>
        <div className="p-6 bg-gradient-to-r from-indigo-500 to-violet-600 text-white flex justify-between items-center">
          <h2 className="text-2xl font-bold">Smart Meal Planner</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-indigo-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Daily Calorie Target</label>
                <span className="text-sm text-gray-500">{calorieTarget} kcal</span>
              </div>
              <input
                type="range"
                min="1300"
                max="2300"
                step="50"
                value={calorieTarget}
                onChange={(e) => setCalorieTarget(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">1300 kcal</span>
                <span className="text-xs text-gray-500">2300 kcal</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Daily Protein Target</label>
                <span className="text-sm text-gray-500">{proteinTarget}g</span>
              </div>
              <input
                type="range"
                min="50"
                max="150"
                step="5"
                value={proteinTarget}
                onChange={(e) => setProteinTarget(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">50g</span>
                <span className="text-xs text-gray-500">150g</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={findOptimalMeals}
              disabled={loading}
              className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Planning meals...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                  <span>Plan My Meals</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
