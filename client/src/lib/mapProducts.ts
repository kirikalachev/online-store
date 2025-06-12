import { RawProduct, Product} from "@/types/product";

export function mapProducts(raw: RawProduct[]): Product[] {
    return raw.map((product) => {
        let categoryId: string;
        let categoryName = "Unknown category";
        let categoryCreatedAt = new Date();

        if (typeof product.category === "string") {
            categoryId = product.category
        }
    })
}

// import { RawProduct, Product } from "@/types/product"

// export function mapProducts(raw: RawProduct[]): Product[] {
//   return raw.map((product) => {
//     let categoryId: string
//     let categoryName = "Unknown Category"
//     let categoryCreatedAt = new Date()

//     if (typeof product.category === "string") {
//       categoryId = product.category
//     } else if (product.category && typeof product.category === "object") {
//       categoryId = product.category._id
//       categoryName = product.category.name
//       categoryCreatedAt = new Date(product.category.createdAt)
//     } else {
//       categoryId = ""
//     }

//     return {
//       id: product._id,
//       name: product.name,
//       description: product.description,
//       price: product.price,
//       category: {
//         id: categoryId,
//         name: categoryName,
//         createdAt: categoryCreatedAt,
//       },
//       mainImage: product.mainImage,
//       galleryImages: product.galleryImages,
//       createdAt: new Date(product.createdAt),
//     }
//   })
// }
