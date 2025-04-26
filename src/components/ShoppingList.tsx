import { useMemo } from 'react';
import { useMealContext } from '@/context/MealContext';
import Modal from './Modal';
import mealsData from '@/data/meals.json';

interface ShoppingListProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Product {
  product: string;
  quantity: string;
  description: string;
}

interface ProductWithCount extends Product {
  count: number;
}

interface ShoppingItem {
  ingredient: string;
  amount: number;
  rawAmount: boolean;
  selectedProduct?: ProductWithCount;
}

function getProductQuantityInGrams(quantityStr: string): number {
  const match = quantityStr.match(/(\d+)g/);
  if (match) {
    return parseInt(match[1], 10);
  }
  // Handle special cases
  if (quantityStr.includes('pieces')) {
    const pieces = parseInt(quantityStr.split(' ')[0], 10);
    return pieces * 200; // Assuming each piece is about 200g
  }
  if (quantityStr.includes('loaf')) {
    return quantityStr.includes('half') ? 400 : 800; // Assuming a loaf is 800g
  }
  if (quantityStr.includes('ml')) {
    const ml = parseInt(quantityStr.match(/(\d+)ml/)?.[1] || '0', 10);
    return ml; // Assuming 1ml = 1g for simplicity
  }
  return 0;
}

function findBestProductMatch(ingredient: string, products: Product[]): Product[] {
  return products.filter(p => 
    p.product.toLowerCase().includes(ingredient.toLowerCase()) ||
    ingredient.toLowerCase().includes(p.product.toLowerCase().replace(' (small)', ''))
  ).sort((a, b) => {
    // Sort smaller packages first
    return a.product.includes('small') ? -1 : 1;
  });
}

function calculateProductQuantity(requiredAmount: number, product: Product): number {
  const productAmount = getProductQuantityInGrams(product.quantity);
  return Math.ceil(requiredAmount / productAmount);
}

export default function ShoppingList({ isOpen, onClose }: ShoppingListProps) {
  const { consolidatedIngredients } = useMealContext();
  const products = mealsData.products;

  const shoppingItems = useMemo(() => {
    return Object.entries(consolidatedIngredients).map(([ingredient, amount]) => {
      const matchingProducts = findBestProductMatch(ingredient, products);
      
      if (matchingProducts.length === 0) {
        return {
          ingredient,
          amount,
          rawAmount: true,
          selectedProduct: undefined
        } as ShoppingItem;
      }

      // Calculate quantities for each matching product
      const productQuantities = matchingProducts.map(product => ({
        ...product,
        count: calculateProductQuantity(amount, product)
      }));

      // Find the most efficient combination (prefer smaller packages if the difference is 1 unit)
      const bestProduct = productQuantities.reduce((best, current) => {
        if (!best) return current;
        const bestTotalAmount = getProductQuantityInGrams(best.quantity) * best.count;
        const currentTotalAmount = getProductQuantityInGrams(current.quantity) * current.count;
        if (Math.abs(bestTotalAmount - amount) > Math.abs(currentTotalAmount - amount)) {
          return current;
        }
        return best;
      });

      return {
        ingredient,
        amount,
        rawAmount: false,
        selectedProduct: bestProduct
      } as ShoppingItem;
    });
  }, [consolidatedIngredients, products]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Shopping Cart">
      <div className="space-y-4">
        {shoppingItems.map((item) => (
          <div key={item.ingredient} className="flex flex-col p-3 bg-white rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-800 font-medium">{item.ingredient}</span>
              <span className="text-gray-500 text-sm">({item.amount}g total)</span>
            </div>
            {item.rawAmount ? (
              <span className="text-orange-600 text-sm mt-1">No matching product found</span>
            ) : item.selectedProduct && (
              <div className="mt-1 text-sm text-gray-600">
                Buy: {item.selectedProduct.count}× {item.selectedProduct.product}
                <span className="block text-gray-500 text-xs">{item.selectedProduct.description}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
}
