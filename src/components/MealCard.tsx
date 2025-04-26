import React from 'react';
import { Dish } from '@/types/meals';

interface MealCardProps {
  dish: Dish;
  isSelected: boolean;
  onClick: () => void;
}

export default function MealCard({ dish, isSelected, onClick }: MealCardProps) {
  return (
    <div
      className={`p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-200 transform hover:scale-[1.02] ${
        isSelected
          ? 'bg-gradient-to-br from-indigo-500 to-violet-600 border-2 border-indigo-400'
          : 'bg-white hover:bg-gray-50 border border-gray-200'
      }`}
      onClick={onClick}
    >
      <h3 className={`text-xl font-bold mb-4 min-h-[3.5rem] ${isSelected ? 'text-white' : 'text-gray-900'}`}>
        {dish.name}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className={`p-3 rounded-lg ${isSelected ? 'bg-indigo-400/20' : 'bg-gray-50'}`}>
          <div className={`text-sm ${isSelected ? 'text-indigo-100' : 'text-gray-600'}`}>Calories</div>
          <div className={`text-lg font-semibold mt-1 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
            {dish.calories_kcal}
            <span className={`text-sm ml-1 ${isSelected ? 'text-indigo-200' : 'text-gray-500'}`}>kcal</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${isSelected ? 'bg-indigo-400/20' : 'bg-gray-50'}`}>
          <div className={`text-sm ${isSelected ? 'text-indigo-100' : 'text-gray-600'}`}>Protein</div>
          <div className={`text-lg font-semibold mt-1 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
            {dish.protein_g}
            <span className={`text-sm ml-1 ${isSelected ? 'text-indigo-200' : 'text-gray-500'}`}>g</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${isSelected ? 'bg-indigo-400/20' : 'bg-gray-50'}`}>
          <div className={`text-sm ${isSelected ? 'text-indigo-100' : 'text-gray-600'}`}>Carbs</div>
          <div className={`text-lg font-semibold mt-1 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
            {dish.carbs_g}
            <span className={`text-sm ml-1 ${isSelected ? 'text-indigo-200' : 'text-gray-500'}`}>g</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${isSelected ? 'bg-indigo-400/20' : 'bg-gray-50'}`}>
          <div className={`text-sm ${isSelected ? 'text-indigo-100' : 'text-gray-600'}`}>Fat</div>
          <div className={`text-lg font-semibold mt-1 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
            {dish.fat_g}
            <span className={`text-sm ml-1 ${isSelected ? 'text-indigo-200' : 'text-gray-500'}`}>g</span>
          </div>
        </div>
      </div>
    </div>
  );
}
