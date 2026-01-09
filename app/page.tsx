import { Container } from "@/components/Container";
import HeroSection from "@/components/HeroSection";
import SectionHeader from "@/components/SectionHeader";
import {
  HOME_BRANDS_QUERY,
  HOME_MOST_RATING_PRODUCT_QUERY,
  HOME_MOST_SOLD_PRODUCT_QUERY,
  HOME_NEWEST_PRODUCT_QUERY,
} from "@/constants/queryStrings";
import { Categories, Products } from "@/features/api";
import { Brands } from "@/features/brands/api/api";
import { BrandCarousel } from "@/features/brands/components/BrandCarousel";
import CategoriesGrid from "@/features/Categories/components/CategoriesGrid";
import CategoryCard from "@/features/Categories/components/CategoryCard";
import { CategoryCarousel } from "@/features/Categories/components/CategoryCarousel";
import HomeProductCard from "@/features/products/components/HomeProductCard";
import MoreProducts from "@/features/products/components/MoreProducts";
import ProductsGrid from "@/features/products/components/ProductsGrid";
import Link from "next/link";
export const products = [
  {
    title: "Modern Ceramic Vase with Minimalist Design",
    slug: "ceramic-vase",
    description:
      "A modern ceramic vase with a clean minimalist design, perfect for contemporary interiors.",

    imageCover: {
      url: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500&h=500&fit=crop",
      id: "ceramic-vase-cover",
    },

    images: [
      {
        url: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500&h=500&fit=crop",
      },
    ],

    options: [
      {
        name: "Size",
        values: ["Standard"],
      },
    ],

    variants: [
      {
        attributes: {
          Size: "Standard",
        },
        price: 89.99,
        priceAfterDiscount: 64.99,
        stock: 20,
        images: [
          {
            url: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500&h=500&fit=crop",
          },
        ],
      },
    ],

    ratingsAverage: 4.8,
    ratingsQuantity: 234,
    isFreeShipping: true,
  },

  {
    title: "Luxury Scented Candle Set",
    slug: "candle-set",
    description:
      "A luxury scented candle set crafted to elevate your home ambiance.",

    imageCover: {
      url: "https://images.unsplash.com/photo-1602874801006-c2b1a1a5d6b2?w=500&h=500&fit=crop",
      id: "candle-set-cover",
    },

    images: [
      {
        url: "https://images.unsplash.com/photo-1602874801006-c2b1a1a5d6b2?w=500&h=500&fit=crop",
      },
    ],

    options: [
      {
        name: "Pack",
        values: ["Set"],
      },
    ],

    variants: [
      {
        attributes: {
          Pack: "Set",
        },
        price: 49.99,
        stock: 50,
        images: [
          {
            url: "https://images.unsplash.com/photo-1602874801006-c2b1a1a5d6b2?w=500&h=500&fit=crop",
          },
        ],
      },
    ],

    ratingsAverage: 4.6,
    ratingsQuantity: 567,
    isFreeShipping: false,
  },

  {
    title: "Handwoven Cotton Throw Blanket",
    slug: "throw-blanket",
    description:
      "A premium handwoven cotton throw blanket offering warmth and style.",

    imageCover: {
      url: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500&h=500&fit=crop",
      id: "throw-blanket-cover",
    },

    images: [
      {
        url: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500&h=500&fit=crop",
      },
    ],

    options: [
      {
        name: "Material",
        values: ["Cotton"],
      },
    ],

    variants: [
      {
        attributes: {
          Material: "Cotton",
        },
        price: 129.99,
        priceAfterDiscount: 97.49,
        stock: 0,
        images: [
          {
            url: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500&h=500&fit=crop",
          },
        ],
      },
    ],

    ratingsAverage: 4.9,
    ratingsQuantity: 892,
    isFreeShipping: true,
  },

  {
    title: "Decorative Wall Mirror",
    slug: "wall-mirror",
    description:
      "A decorative wall mirror that adds elegance and depth to any room.",

    imageCover: {
      url: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=500&h=500&fit=crop",
      id: "wall-mirror-cover",
    },

    images: [
      {
        url: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=500&h=500&fit=crop",
      },
    ],

    options: [
      {
        name: "Shape",
        values: ["Round"],
      },
    ],

    variants: [
      {
        attributes: {
          Shape: "Round",
        },
        price: 159.99,
        stock: 15,
        images: [
          {
            url: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=500&h=500&fit=crop",
          },
        ],
      },
    ],

    ratingsAverage: 4.7,
    ratingsQuantity: 123,
    isFreeShipping: false,
  },
];

const requests = [
  Brands.findMany(HOME_BRANDS_QUERY, {
    adapter: "fetch",
    fetchOptions: { cache: "no-store" },
  }),
  Categories.findMany("?limit=50", {
    adapter: "fetch",
    fetchOptions: { cache: "no-store" },
    // fetchOptions: { cache: "force-cache" },
  }),

  Products.findMany(HOME_MOST_SOLD_PRODUCT_QUERY),
  Products.findMany(HOME_MOST_RATING_PRODUCT_QUERY),
  Products.findMany(HOME_NEWEST_PRODUCT_QUERY),
] as const;
export default async function Page() {
  const [
    BrandResponse,
    categoriesResponse,
    mostSolidProductsResponse,
    mostRatingProductResponse,
    newestProductResponse,
  ] = await Promise.all(requests);

  const brands = BrandResponse.data.data;
  const categories = categoriesResponse.data.data;
  const mostSolidProducts = mostSolidProductsResponse.data;
  const mostRatingProducts = mostRatingProductResponse.data;
  const newestProducts = newestProductResponse.data;

  return (
    <main className="min-h-screen flex flex-col gap-40 bg-linear-to-br ">
      <HeroSection />
      <Container>
        <section>
          <SectionHeader
            title={" الأكثر مبيعًا"}
            description=" اكتشف منتجاتنا الأكثر مبيعًا، والتي اختارها عملاؤنا بعناية"
          />
          <ProductsGrid>
            {mostSolidProducts.map((product) => (
              <HomeProductCard key={product.title} product={product} />
            ))}
            <MoreProducts
              initialPage={2}
              query={`${HOME_MOST_RATING_PRODUCT_QUERY}`}
            />
          </ProductsGrid>
        </section>
        <section className="">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
              علاماتنا التجارية
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground text-balance">
              تسوق حسب الماركة
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              اكتشف أفضل العلامات التجارية المختارة بعناية، والتي تجمع بين
              الجودة، الابتكار، والتصميم العصري لتلبية جميع احتياجاتك
            </p>
          </div>
          <BrandCarousel brands={brands} />
        </section>
        <section>
          <SectionHeader
            title="أحدث ما وصل"
            description="استكشف أحدث المنتجات التي وصلت حديثًا لمجموعتنا، واختر من بين أحدث الصيحات والجودة المضمونة"
          />
          <ProductsGrid>
            {newestProducts.map((product) => (
              <HomeProductCard key={product.title} product={product} />
            ))}
            <MoreProducts
              initialPage={2}
              query={`${HOME_MOST_RATING_PRODUCT_QUERY}`}
            />
          </ProductsGrid>
        </section>
        <section>
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
              مجموعاتنا
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground text-balance">
              تسوق حسب الفئة
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              استكشف مجموعاتنا المختارة بعناية من مستلزمات المنزل، التحف
              الكلاسيكية، ومنتجات العناية والجمال
            </p>
          </div>
          <CategoryCarousel categories={categories} showNavigation />
          {/* <CategoriesGrid>
          {categories.map((c) => {
              return (
                <Link href={`/products?category=${c._id}`} key={c._id}>
                  <CategoryCard category={c} />;
                </Link>
              );
            })}
        </CategoriesGrid> */}
        </section>

        <section>
          <SectionHeader
            title="الأعلى تقييماً"
            description="اكتشف منتجاتنا التي حصلت على أعلى تقييمات من عملائنا، لضمان الجودة والرضا التام"
          />
          <ProductsGrid>
            {mostRatingProducts.map((product) => (
              <HomeProductCard key={product.title} product={product} />
            ))}
            <MoreProducts
              initialPage={2}
              query={`${HOME_MOST_RATING_PRODUCT_QUERY}`}
            />
          </ProductsGrid>
        </section>
      </Container>
    </main>
  );
}
