import { DailyNutrition } from '@/types/meals';

interface NutritionSummaryProps {
  nutrition: DailyNutrition;
}

export default function NutritionSummary({ nutrition }: NutritionSummaryProps) {
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl shadow-lg p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">Daily Nutrition Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="text-indigo-100 text-sm">Total Calories</div>
          <div className="text-2xl font-bold mt-1">
            {nutrition.calories_kcal}
            <span className="text-lg ml-1 text-indigo-200">kcal</span>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="text-indigo-100 text-sm">Total Protein</div>
          <div className="text-2xl font-bold mt-1">
            {nutrition.protein_g}
            <span className="text-lg ml-1 text-indigo-200">g</span>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="text-indigo-100 text-sm">Total Carbs</div>
          <div className="text-2xl font-bold mt-1">
            {nutrition.carbs_g}
            <span className="text-lg ml-1 text-indigo-200">g</span>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="text-indigo-100 text-sm">Total Fat</div>
          <div className="text-2xl font-bold mt-1">
            {nutrition.fat_g}
            <span className="text-lg ml-1 text-indigo-200">g</span>
          </div>
        </div>
      </div>
    </div>
  );
}
