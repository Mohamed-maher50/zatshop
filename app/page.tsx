import { Container } from "@/components/Container";
import { Categories, Products } from "@/features/api";
import CategoriesGrid from "@/features/Categories/components/CategoriesGrid";
import CategoryCard from "@/features/Categories/components/CategoryCard";
import HomeProductCard from "@/features/products/components/HomeProductCard";
import ProductsGrid from "@/features/products/components/ProductsGrid";
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

export default async function Page() {
  const categoriesResponse = await Categories.findMany("?limit=4");
  const categories = categoriesResponse.data;
  const productsResponse = await Products.findMany(
    "?limit=4&fields=variants,title,imageCover,ratingsQuantity,isFreeShipping,TotalStock,TotalSold,_id"
  );
  const products = productsResponse.data;

  return (
    <main className="min-h-screen flex flex-col gap-20 bg-linear-to-br ">
      <Container>
        <div className="flex flex-col gap-20">
          <CategoriesGrid>
            {categories.map((c) => {
              return <CategoryCard category={c} key={c._id} />;
            })}
          </CategoriesGrid>
          <div className="mb-8">
            <h1 className="text-3xl  text-center font-garamond font-bold uppercase  text-[#3A3845] mb-2">
              Best Sellers
            </h1>
          </div>
          <ProductsGrid>
            {products.map((product) => (
              <HomeProductCard key={product.title} product={product} />
            ))}
          </ProductsGrid>
          <ProductsGrid>
            {products.map((product) => (
              <HomeProductCard key={product.title} product={product} />
            ))}
          </ProductsGrid>
        </div>
      </Container>
    </main>
  );
}
