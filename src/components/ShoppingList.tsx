import { useMemo } from 'react';

interface ShoppingListProps {
  ingredients: { [key: string]: number };
  products: Array<{ product: string; quantity: string; description: string }>;
}

export default function ShoppingList({ ingredients, products }: ShoppingListProps) {
  const getProduct = (ingredient: string) => {
    return products.find((p) =>
      p.product.toLowerCase().includes(ingredient.toLowerCase())
    );
  };

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl shadow-lg p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">Shopping List</h2>
      <div className="space-y-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Required Ingredients</h3>
          <div className="grid gap-3">
            {Object.entries(ingredients).map(([ingredient, amount]) => {
              const product = getProduct(ingredient);
              return (
                <div
                  key={ingredient}
                  className="flex items-center justify-between bg-white/5 p-3 rounded-lg"
                >
                  <div>
                    <span className="font-medium">{ingredient}</span>
                    <span className="text-indigo-200 ml-2">{amount}g needed</span>
                  </div>
                  {product && (
                    <div className="text-sm text-right">
                      <div className="text-indigo-200">Buy: {product.product}</div>
                      <div className="text-indigo-100 text-xs">{product.description}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Products to Buy</h3>
          <div className="grid gap-3">
            {Array.from(
              new Set(
                Object.keys(ingredients)
                  .map((ingredient) => getProduct(ingredient))
                  .filter((product) => product !== undefined)
              )
            ).map((product) => (
              <div
                key={product!.product}
                className="flex items-center justify-between bg-white/5 p-3 rounded-lg"
              >
                <div className="font-medium">{product!.product}</div>
                <div className="text-right">
                  <div className="text-indigo-200">{product!.quantity}</div>
                  <div className="text-indigo-100 text-xs">{product!.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
