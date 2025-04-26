# Pantry.io 🛒

A modern meal planning application that helps you plan your daily meals and generate smart shopping lists.

## Features 🌟

- **Smart Meal Planning**: Select meals for breakfast, lunch, dinner, and snacks
- **Nutritional Insights**: Real-time nutrition summary with calories, protein, carbs, and fat
- **Automated Shopping List**: Intelligent shopping list generation based on selected meals
- **Beautiful UI**: Modern, responsive design with gradients and glassmorphism effects
- **Type-Safe**: Built with TypeScript for robust code quality

## Smart Meal Planner

The Smart Meal Planner feature helps you automatically plan meals that match your nutritional goals:

- Set daily calorie targets (1300-2300 kcal)
- Set protein targets (50-150g)
- Click the magic wand button to access the planner
- Get instant meal suggestions that match your goals

## Tech Stack 💻

- **Framework**: Next.js 15.3 with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Development**: ESLint, PostCSS

## Getting Started 🚀

1. Clone the repository:
   ```bash
   git clone https://github.com/ManojRaga/one_stop_meal_shop.git
   cd one_stop_meal_shop
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure 📁

```
src/
├── app/              # Next.js app directory
├── components/       # React components
│   ├── MealCard
│   ├── NutritionSummary
│   └── ShoppingList
├── context/         # React Context for state management
├── data/            # JSON data for meals
└── types/           # TypeScript type definitions
```

## Features in Detail 🔍

### Meal Selection
- Interactive meal cards with nutritional information
- Category-based organization (breakfast, lunch, dinner, snacks)
- Visual feedback for selected meals

### Nutrition Tracking
- Real-time calculation of daily nutritional intake
- Beautiful gradient cards displaying macro nutrients
- Easy-to-read format with clear metrics

### Shopping List
- Automatic generation based on selected meals
- Smart grouping of ingredients
- Product suggestions with quantities
- Clean, organized layout for easy shopping

## Contributing 🤝

Feel free to open issues and pull requests for any improvements you want to add.

## License 📄

MIT License - feel free to use this project for personal or commercial purposes.