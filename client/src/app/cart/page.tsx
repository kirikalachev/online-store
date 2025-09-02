'use client';

import { useState, useEffect } from "react";
import { getCart, addToCart, removeFromCart, clearCart } from "@/lib/api/cart";
import { getProductsByIds } from "@/lib/api/products";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

interface CartItemWithProduct extends CartItem {
  product: Product;
}

export default function CartComponent() {
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCart() {
      try {
        const data = await getCart(); // връща { items: CartItem[] }
        const productIds = data.items.map(item => item.product._id);
        const products = await getProductsByIds(productIds); // връща масив с { _id, name, image }
        
        const combined: CartItemWithProduct[] = data.items.map(item => {
          const product = products.find(p => p._id === item.product._id);
          return { ...item, product: product! }; // ! защото product трябва да съществува
        });

        setCartItems(combined);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, []);

  const handleAdd = async (productId: string) => {
    const data = await addToCart(productId, 1);
    const products = await getProductsByIds(data.items.map(i => i.product._id));
    const combined = data.items.map(item => ({
      ...item,
      product: products.find(p => p._id === item.product._id)!
    }));
    setCartItems(combined);
  };

  const handleRemove = async (productId: string) => {
    const data = await removeFromCart(productId);
    const products = await getProductsByIds(data.items.map(i => i.product._id));
    const combined = data.items.map(item => ({
      ...item,
      product: products.find(p => p._id === item.product._id)!
    }));
    setCartItems(combined);
  };

  const handleClear = async () => {
    await clearCart();
    setCartItems([]);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) return <div className="p-6 text-center">Зареждане...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">🛒 Моята количка</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Количката е празна</p>
      ) : (
        <div>
          <ul className="divide-y divide-gray-200 mb-6">
            {cartItems.map(item => (
              <li
                key={`${item.product._id}-${item.price}`} 
                className="flex items-center justify-between py-4"
              >
                <div className="flex items-center gap-4">
                  <img src={item.product.mainImage} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div>
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} × {item.price} лв.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAdd(item.product._id)}
                    className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(item.product._id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                  >
                    –
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between border-t pt-4">
            <p className="text-lg font-semibold">Общо: {total.toFixed(2)} лв.</p>
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm"
            >
              Изчисти количката
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


// 'use client';

// import { useState, useEffect } from "react";
// import { getCart, addToCart, removeFromCart, clearCart } from "@/lib/api/cart";
// import type { CartItem } from "@/types/cart";

// export default function CartComponent() {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchCart() {
//       try {
//         const data = await getCart();
//         setCartItems(data.items);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchCart();
//   }, []);

//   const handleAdd = async (productId: string) => {
//     const data = await addToCart(productId, 1);
//     setCartItems(data.items);
//   };

//   const handleRemove = async (productId: string) => {
//     const data = await removeFromCart(productId);
//     setCartItems(data.items);
//   };

//   const handleClear = async () => {
//     await clearCart();
//     setCartItems([]);
//   };

//   const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   if (loading) return <div className="p-6 text-center">Зареждане...</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md">
//       <h2 className="text-2xl font-bold mb-6">🛒 Моята количка</h2>

//       {cartItems.length === 0 ? (
//         <p className="text-gray-500">Количката е празна</p>
//       ) : (
//         <div>
//           <ul className="divide-y divide-gray-200 mb-6">
//             {cartItems.map(item => (
//               <li key={`${item.product._id}-${item.price}`} className="flex items-center justify-between py-4">
//                 <div>
//                   <p className="font-semibold">{"Име " + item.product.name + " ..."}</p>
//                   <p className="text-sm text-gray-500">
//                     {item.quantity} × {item.price} лв.
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => handleAdd(item.product._id)}
//                     className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm"
//                   >
//                     +
//                   </button>
//                   <button
//                     onClick={() => handleRemove(item.product._id)}
//                     className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
//                   >
//                     –
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>

//           <div className="flex items-center justify-between border-t pt-4">
//             <p className="text-lg font-semibold">Общо: {total.toFixed(2)} лв.</p>
//             <button
//               onClick={handleClear}
//               className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm"
//             >
//               Изчисти количката
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
