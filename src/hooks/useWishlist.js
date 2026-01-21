import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWishlist = create(
    persist((set, get) => ({
      wishlist: [],
      toggleWishlist: (product) => {
        const currentWishlist = get().wishlist;
        const isExist = currentWishlist.find((item) => item.id === product.id);

        if (isExist) {
          set({
            wishlist: currentWishlist.filter((item) => item.id !== product.id),
          });
        } else {
          set({ wishlist: [...currentWishlist, product] });
        }
      },

      isCurrentlyLiked: (id) => {
        return get().wishlist.some((item) => item.id === id);
      },

      clearWishlist: () => set({ wishlist: [] }),
    }),

    {
      name: 'wishlist-storage',
    }
  )
);

export default useWishlist;