// import { useEffect } from "react";

// import CategoryGrid from "../../categories/components/CategoryGrid";
// import useCategories from "../../categories/hooks/useCategories";

// const CategorySection = () => {
//   const {
//     categories,
//     loading,
//     error,
//     fetchCategories,
//   } = useCategories();

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <section className="mx-auto max-w-7xl px-4 py-16">
//       <div className="mb-10 flex items-center justify-between">
//         <div>
//           <h2 className="text-4xl font-bold">
//             Categories
//           </h2>

//           <p className="mt-2 text-gray-500">
//             Explore our delicious menu.
//           </p>
//         </div>
//       </div>

//       {loading && (
//         <p className="text-center text-lg">
//           Loading categories...
//         </p>
//       )}

//       {error && (
//         <p className="text-center text-red-500">
//           {error}
//         </p>
//       )}

//       {!loading && !error && (
//         <CategoryGrid categories={categories} />
//       )}
//     </section>
//   );
// };

// export default CategorySection;