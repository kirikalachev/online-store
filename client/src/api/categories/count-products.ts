// import { NextApiRequest, NextApiResponse } from 'next'
// import dbConnect from '@/lib/dbConnect'
// import { Product, RawProduct, Category, RawCategory } from '@/types/product'; 

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await dbConnect()

//   try {
//     // Групираме продуктите по category и броим
//     const counts = await Product.aggregate([
//       {
//         $group: {
//           _id: '$category',
//           count: { $sum: 1 }
//         }
//       }
//     ])

//     // Превръщаме в удобен формат
//     const result = counts.map(c => ({
//       categoryId: c._id.toString(),
//       productCount: c.count
//     }))

//     res.status(200).json(result)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Вътрешна грешка' })
//   }
// }
