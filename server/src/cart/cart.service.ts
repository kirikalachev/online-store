import Cart, { ICartItem } from "./cart.model";
import Product from "../products/product.model";
import mongoose from "mongoose";

export class CartService {
  static async getCart(userId: string | null, cartId: string | null) {
    if (userId) return await Cart.findOne({ userId });
    if (cartId && mongoose.Types.ObjectId.isValid(cartId)) {
      return await Cart.findById(cartId);
    }
    return null;
  }

  static async addToCart(
    userId: string | null,
    cartId: string | null,
    productId: string,
    quantity: number
  ) {
    if (!mongoose.Types.ObjectId.isValid(productId)) throw new Error("Invalid product ID");

    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");

    let cart = await this.getCart(userId, cartId);
    if (!cart) cart = new Cart({ userId: userId || null, items: [] });

    // Търсим ред със същия продукт **и същата цена**
    // const existingItem = cart.items.find(
    //   i => i.productId.equals(product._id) && i.priceAtTheTime === product.price
    // );
    const existingItem = cart.items.find(
      i => i.productId.equals(product._id as mongoose.Types.ObjectId) && i.priceAtTheTime === product.price
    );


    if (existingItem) {
      // Ако съществува ред с тази цена – увеличаваме количеството
      existingItem.quantity += quantity;
    } else {
      // Ако няма такъв ред или цената се е променила – добавяме нов ред
      cart.items.push({
        productId: new mongoose.Types.ObjectId(productId),
        quantity,
        priceAtTheTime: product.price
      });
    }

    await cart.save();
    return cart;
  }

  static async removeFromCart(userId: string | null, cartId: string | null, productId: string) {
    const cart = await this.getCart(userId, cartId);
    if (!cart) throw new Error("Cart not found");

    cart.items = cart.items.filter(i => !i.productId.equals(productId));
    await cart.save();
    return cart;
  }

  static async clearCart(userId: string | null, cartId: string | null) {
    const cart = await this.getCart(userId, cartId);
    if (!cart) throw new Error("Cart not found");

    cart.items = [];
    await cart.save();
    return cart;
  }
}


// import Cart, { ICartItem } from "./cart.model";
// import Product from "../products/product.model";
// import mongoose from "mongoose";

// export class CartService {
//   static async getCart(userId: string | null, cartId: string | null) {
//     if (userId) return await Cart.findOne({ userId });
//     if (cartId && mongoose.Types.ObjectId.isValid(cartId)) {
//       return await Cart.findById(cartId);
//     }
//     return null;
//   }

//   static async addToCart(
//     userId: string | null,
//     cartId: string | null,
//     productId: string,
//     quantity: number
//   ) {
//     if (!mongoose.Types.ObjectId.isValid(productId)) throw new Error("Invalid product ID");

//     const product = await Product.findById(productId);
//     if (!product) throw new Error("Product not found");

//     let cart = await this.getCart(userId, cartId);
//     if (!cart) cart = new Cart({ userId: userId || null, items: [] });

//     // const itemIndex = cart.items.findIndex(i => i.productId.equals(product._id));
//     const itemIndex = cart.items.findIndex(i =>
//         i.productId.equals(product._id as mongoose.Types.ObjectId)
//     );
//     if (itemIndex > -1) cart.items[itemIndex].quantity += quantity;
//     else
//       cart.items.push({
//         productId: new mongoose.Types.ObjectId(productId),
//         quantity,
//         priceAtTheTime: product.price
//       });

//     await cart.save();
//     return cart;
//   }

//   static async removeFromCart(userId: string | null, cartId: string | null, productId: string) {
//     const cart = await this.getCart(userId, cartId);
//     if (!cart) throw new Error("Cart not found");

//     cart.items = cart.items.filter(i => !i.productId.equals(productId));
//     await cart.save();
//     return cart;
//   }

//   static async clearCart(userId: string | null, cartId: string | null) {
//     const cart = await this.getCart(userId, cartId);
//     if (!cart) throw new Error("Cart not found");

//     cart.items = [];
//     await cart.save();
//     return cart;
//   }
// }
