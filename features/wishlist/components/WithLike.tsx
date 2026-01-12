// hocs/WithLike.tsx

import { ComponentType, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner"; // أو react-hot-toast حسب المكتبة اللي تستخدمها
import { WishList } from "../api/api";

// ===== Types =====

// نوع بيانات الـ Session المخصصة
interface CustomSession {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    wishlist: string[]; // قائمة معرفات المنتجات المفضلة
  };
}

// نوع استجابة API الـ WishList
interface WishListResponse {
  data: {
    data: string[]; // القائمة المحدثة من معرفات المنتجات
  };
}

// Props التي سيتم حقنها في الـ Component
export interface WithLikeProps {
  isLikeProcess: boolean;
  toggleLike: (productId: string) => Promise<void>;
  isLiked: (productId: string) => boolean;
  wishlist: string[];
  isAuthenticated: boolean;
}

// ===== HOC Implementation =====

/**
 * Higher Order Component لإضافة وظائف الإعجاب لأي Component
 * @param Component - الـ Component المراد تغليفه
 * @returns Component جديد مع Props إضافية للإعجاب
 */
const WithLike = <P extends object>(
  Component: ComponentType<P & WithLikeProps>
) => {
  const WrappedComponent = (props: Omit<P, keyof WithLikeProps>) => {
    const { status, update, data } = useSession();
    const [isLikeProcess, setIsLikeProcess] = useState(false);

    // التحقق من حالة المصادقة
    const isAuthenticated =
      status === "loading" ? true : status === "authenticated";

    // الحصول على قائمة الأمنيات الحالية
    const wishlist = (data as CustomSession | null)?.user?.wishlist || [];

    /**
     * دالة للتحقق من وجود منتج في قائمة الأمنيات
     */
    const isLiked = (productId: string): boolean => {
      return wishlist.includes(productId);
    };

    /**
     * دالة لإضافة/إزالة منتج من قائمة الأمنيات
     */
    const toggleLike = async (productId: string): Promise<void> => {
      if (!isAuthenticated) {
        toast.error("يرجى تسجيل الدخول أولاً");
        return;
      }

      if (!productId) {
        toast.error("معرف المنتج غير صحيح");
        return;
      }

      setIsLikeProcess(true);

      const isCurrentlyLiked = isLiked(productId);
      const request = isCurrentlyLiked
        ? WishList.remove(productId)
        : WishList.add(productId);

      toast.promise(request, {
        loading: "جاري التحديث...",
        success: async (res: WishListResponse) => {
          try {
            await update({ wishlist: res.data.data });
            return isCurrentlyLiked
              ? "تم الإزالة من المفضلة"
              : "تم الإضافة للمفضلة";
          } catch (error) {
            console.error("Error updating session:", error);
            throw new Error("فشل تحديث البيانات");
          }
        },
        error: (error: Error) => {
          console.error("Toggle like error:", error);
          return error.message || "حدث خطأ، يرجى المحاولة مرة أخرى";
        },
        finally: () => {
          setIsLikeProcess(false);
        },
      });
    };

    return (
      <Component
        {...(props as P)}
        isLikeProcess={isLikeProcess}
        toggleLike={toggleLike}
        isLiked={isLiked}
        wishlist={wishlist}
        isAuthenticated={isAuthenticated}
      />
    );
  };

  // الحفاظ على اسم الـ Component للـ DevTools
  WrappedComponent.displayName = `WithLike(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
};

export default WithLike;

const WithLikeOptimistic = <P extends object>(
  Component: ComponentType<P & WithLikeProps>
) => {
  const WrappedComponent = (props: Omit<P, keyof WithLikeProps>) => {
    const { status, update, data } = useSession();
    const [isLikeProcess, setIsLikeProcess] = useState(false);
    const [optimisticWishlist, setOptimisticWishlist] = useState<string[]>([]);

    const isAuthenticated = status === "authenticated";
    const serverWishlist = (data as CustomSession | null)?.user?.wishlist || [];
    const wishlist =
      optimisticWishlist.length > 0 ? optimisticWishlist : serverWishlist;

    const isLiked = (productId: string): boolean => {
      return wishlist.includes(productId);
    };

    const toggleLike = async (productId: string): Promise<void> => {
      if (!isAuthenticated) {
        toast.error("يرجى تسجيل الدخول أولاً");
        return;
      }

      // Optimistic Update
      const newWishlist = isLiked(productId)
        ? wishlist.filter((id) => id !== productId)
        : [...wishlist, productId];

      setOptimisticWishlist(newWishlist);
      setIsLikeProcess(true);

      const request = isLiked(productId)
        ? WishList.remove(productId)
        : WishList.add(productId);

      try {
        const res = await request;
        await update({ wishlist: res.data.data });
        setOptimisticWishlist([]);
        toast.success(
          isLiked(productId) ? "تم الإزالة من المفضلة" : "تم الإضافة للمفضلة"
        );
      } catch (error) {
        // Revert on error
        setOptimisticWishlist([]);
        console.error("Toggle like error:", error);
        toast.error("حدث خطأ، يرجى المحاولة مرة أخرى");
      } finally {
        setIsLikeProcess(false);
      }
    };

    return (
      <Component
        {...(props as P)}
        isLikeProcess={isLikeProcess}
        toggleLike={toggleLike}
        isLiked={isLiked}
        wishlist={wishlist}
        isAuthenticated={isAuthenticated}
      />
    );
  };

  WrappedComponent.displayName = `WithLikeOptimistic(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
};

export { WithLikeOptimistic };

export type { CustomSession, WishListResponse };
