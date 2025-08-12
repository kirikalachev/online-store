// import { Request, Response} from 'express';
// import { Cart } from './cart.model';
// import mongoose from 'mongoose';

// export const getCart = async (req: Request, res: Response) => {
//     try {
//         const userId = req.user?._id;
//         if (!userId) return res.status(401).json({ message: "Not authenticated" });
//         let cart = await Cart.findOne({ user: userId }).populate("items.product");

//         if (!cart) {
//             cart = new Cart({ user: userId, items: [] });
//             await cart.save();
//         }
//         res.json(cart);
//     } catch (error) {
//         res.status(500).json({ message: "Error loading cart", error })
//     }
// }

// export const addTocart = async (req: Request, res: Response) => {
//     try {
//         const userId = req.user?._id;
//         const { productId, quantity } = req.body;

//         if (!userId) return res.status(401).json({ message: "Not authenticated" });
//         if(!mongoose.Types.ObjectId.isValid(productId)) {
//             return res.status(400).json({ message: "Invalid product ID" });
//         }
//         const cart = await Cart.findOne({ user: userId }) || new Cart({ user: userId, items: [] });

//         const existingItem = cart.items.find((item) => item.product.toString() === productId);

//         if (existingItem) {
//             existingItem.quantity += quantity || 1;
//         } else {
//             cart.items.push({ product: productId, quantity: quantity || 1 });
//         }
//          await cart.save();
//         res.status(200).json(cart);
//     }
//     catch (error) {
//         res.status(500).json({ message: "Error loading cart", error })
//     }
// }

// export const addTocart = async (req: Request, res: Response) => {
//     try {
//         const userId = req.user?._id;
//         const { productId, quantity } = req.body;

//         if (!userId) return res.status(401).json({ message: "Not authenticated" });
//         if(!mongoose.Types.ObjectId.isValid(productId)) {
//             return res.status(400).json({ message: "Invalid product ID" });
//         }
//         const cart = await Cart.findOne({ user: userId }) || new Cart({ user: userId, items: [] });

//         const existingItem = cart.items.find((item) => item.product.toString() === productId);

//         if (existingItem) {
//             existingItem.quantity += quantity || 1;
//         } else {
//             cart.items.push({ product: productId, quantity: quantity || 1 });
//         }
//          await cart.save();
//         res.status(200).json(cart);
//     }
//     catch (error) {
//         res.status(500).json({ message: "Error loading cart", error })
//     }
// }