'use client';

import { useState, useEffect } from 'react';
import { MealProvider } from '@/context/MealContext';
import { useMealContext } from '@/context/MealContext';
import { MealType, MealData } from '@/types/meals';
import MealCard from '@/components/MealCard';
import NutritionSummary from '@/components/NutritionSummary';
import ShoppingList from '@/components/ShoppingList';
import SmartMealPlanner from '@/components/SmartMealPlanner';
import mealsData from '@/data/meals.json';

function MealPlanner() {
  const { selectedMeals, dailyNutrition, consolidatedIngredients, toggleMealSelection, getSelectedMeal, planMeals } = useMealContext();
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [showSmartPlanner, setShowSmartPlanner] = useState(false);
  const data: MealData = JSON.parse(JSON.stringify(mealsData));

  const mealTypes: { type: MealType; title: string; gradient: string }[] = [
    { type: 'breakfast', title: 'Breakfast', gradient: 'from-orange-50 to-yellow-50' },
    { type: 'lunch', title: 'Lunch', gradient: 'from-blue-50 to-cyan-50' },
    { type: 'dinner', title: 'Dinner', gradient: 'from-purple-50 to-indigo-50' },
    { type: 'snack', title: 'Evening Snack', gradient: 'from-green-50 to-emerald-50' },
  ];

  useEffect(() => {
    if (showShoppingList || showSmartPlanner) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showShoppingList, showSmartPlanner]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-12 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
            <h1 className="text-5xl font-extrabold tracking-normal">
              Pantry<span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200 -ml-[0.15em]">.io</span>
            </h1>
          </div>
          <p className="text-xl text-center text-indigo-100 capitalize">
            Smart Meal Planning For The Modern Kitchen
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="mb-12">
          <NutritionSummary nutrition={dailyNutrition} />
        </div>

        <div className="space-y-12 mb-12">
          {mealTypes.map(({ type, title, gradient }) => (
            <section key={type} className={`bg-gradient-to-br ${gradient} p-8 rounded-2xl shadow-lg border border-gray-200`}>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">{title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.dishes[type].map((dish) => (
                  <MealCard
                    key={dish.name}
                    dish={dish}
                    isSelected={getSelectedMeal(type)?.name === dish.name}
                    onClick={() => toggleMealSelection(type, dish)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-4">
          <button
            onClick={() => setShowSmartPlanner(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            title="Smart Meal Planner"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
          </button>
          {selectedMeals.length > 0 && (
            <button
              onClick={() => setShowShoppingList(true)}
              className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 relative"
              title="View Shopping List"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {Object.keys(consolidatedIngredients).length}
              </span>
            </button>
          )}
        </div>

        {showSmartPlanner && (
          <SmartMealPlanner
            onClose={() => setShowSmartPlanner(false)}
            dishes={data.dishes}
            onPlanMeals={planMeals}
          />
        )}

        {showShoppingList && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center" onClick={() => setShowShoppingList(false)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden m-4" onClick={e => e.stopPropagation()}>
              <div className="p-6 bg-gradient-to-r from-indigo-500 to-violet-600 text-white flex justify-between items-center">
                <h2 className="text-2xl font-bold">Shopping Cart</h2>
                <button 
                  onClick={() => setShowShoppingList(false)}
                  className="text-white hover:text-indigo-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto max-h-[calc(80vh-4rem)]">
                <ShoppingList
                  ingredients={consolidatedIngredients}
                  products={data.products}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <MealProvider>
      <MealPlanner />
    </MealProvider>
  );
}
