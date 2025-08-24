import UserProfileSection from "@/components/profile/UserProfileSection";
import FavoriteProducts from "@/components/profile/FavoriteProducts";

function MyProfile() {
  return (
    <div className="p-4">
      <UserProfileSection />
      <h2 className="text-2xl font-bold mt-6 mb-4">Запазени продукти</h2>
      <FavoriteProducts />
    </div>
  );
}

export default MyProfile;
