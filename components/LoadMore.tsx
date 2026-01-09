import { useState, useEffect } from "react";
import { ShoppingCart, Loader2 } from "lucide-react";

// Generic LoadMore Component - Only fetches, passes result directly
interface LoadMoreProps<TParams, TResult> {
  fetcher: (params: TParams) => Promise<TResult>;
  render: (
    result: TResult | null,
    loading: boolean,
    error: string | null
  ) => React.ReactNode;
  getNextParams: (
    currentParams: TParams | null,
    result: TResult | null
  ) => TParams;
  hasMore: (result: TResult | null) => boolean;
  initialParams: TParams;
  loadingMessage?: string;
  noMoreMessage?: string;
  buttonText?: string;
  onResult?: (result: TResult | null) => void;
}
export function LoadMore<TResult, TParams>({
  fetcher,
  render,
  getNextParams,
  hasMore,
  initialParams,
  loadingMessage = "Loading...",
  noMoreMessage = "No more items to load",
  buttonText = "Load More",
  onResult,
}: LoadMoreProps<TParams, TResult>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentParams, setCurrentParams] = useState<TParams | null>(null);
  const [lastResult, setLastResult] = useState<TResult | null>(null);

  useEffect(() => {
    if (lastResult && onResult) {
      onResult(lastResult);
    }
  }, [lastResult]);

  const loadData = async (params: TParams) => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetcher(params);
      setLastResult(result);
      setCurrentParams(params);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextParams = getNextParams(currentParams, lastResult);
    loadData(nextParams);
  };

  const handleInitialLoad = () => {
    loadData(initialParams);
  };

  // Initial state - no data yet
  if (!currentParams && !loading && !error) {
    return (
      <div className="flex justify-center py-12">
        <button
          onClick={handleInitialLoad}
          className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Load Data
        </button>
      </div>
    );
  }

  return (
    <div>
      {render(lastResult, loading, error)}

      {error && (
        <div className="text-center py-8">
          <p className="text-red-600 font-medium mb-4">Error: {error}</p>
          <button
            onClick={() => loadData(currentParams || initialParams)}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {!error && lastResult && (
        <div className="flex justify-center mt-8">
          {loading ? (
            <div className="flex items-center text-slate-600">
              <Loader2 className="animate-spin mr-2" size={20} />
              {loadingMessage}
            </div>
          ) : hasMore(lastResult) ? (
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="bg-slate-800 hover:bg-slate-900 disabled:bg-slate-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              {buttonText}
            </button>
          ) : (
            <p className="text-slate-600 font-medium">{noMoreMessage}</p>
          )}
        </div>
      )}
    </div>
  );
}

// Example: Product interface
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

// Example fetcher params
interface FetchParams {
  page: number;
  limit: number;
}

// Example fetcher result
interface FetchResult {
  products: Product[];
  hasMore: boolean;
  total: number;
}

// Mock API
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "Fashion",
  },
  {
    id: 4,
    name: "Leather Backpack",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "Accessories",
  },
  {
    id: 5,
    name: "Coffee Maker",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop",
    category: "Home",
  },
  {
    id: 6,
    name: "Yoga Mat",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    category: "Sports",
  },
  {
    id: 7,
    name: "Desk Lamp",
    price: 54.99,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    category: "Home",
  },
  {
    id: 8,
    name: "Sunglasses",
    price: 119.99,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    category: "Accessories",
  },
  {
    id: 9,
    name: "Bluetooth Speaker",
    price: 69.99,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    category: "Electronics",
  },
  {
    id: 10,
    name: "Water Bottle",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    category: "Sports",
  },
  {
    id: 11,
    name: "Notebook Set",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=400&fit=crop",
    category: "Stationery",
  },
  {
    id: 12,
    name: "Plant Pot",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
    category: "Home",
  },
];

// Fetcher function - can have any params and return any structure
const fetchProducts = async (params: FetchParams): Promise<FetchResult> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const start = (params.page - 1) * params.limit;
  const end = start + params.limit;
  const products = mockProducts.slice(start, end);
  const hasMore = end < mockProducts.length;

  return {
    products,
    hasMore,
    total: mockProducts.length,
  };
};

// Main App - YOU store the items, component only passes fresh data
export default function App() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const handleResult = (result: FetchResult | null) => {
    if (result && result.products.length > 0) {
      setAllProducts((prev) => {
        const lastPrevId = prev[prev.length - 1]?.id;
        const firstNewId = result.products[0]?.id;

        // Only add if it's new data
        if (lastPrevId !== firstNewId || prev.length === 0) {
          return [...prev, ...result.products];
        }
        return prev;
      });
    }
  };

  const handleRender = (
    result: FetchResult | null,
    loading: boolean,
    error: string | null
  ) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {allProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48 overflow-hidden bg-slate-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-semibold text-slate-700">
                {product.category}
              </span>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                {product.name}
              </h3>

              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-slate-900">
                  ${product.price}
                </span>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200">
                  <ShoppingCart size={16} />
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Our Products</h1>
        <p className="text-slate-600 mb-8">
          Discover amazing products at great prices
        </p>

        <LoadMore<FetchResult, FetchParams>
          fetcher={fetchProducts}
          render={handleRender}
          onResult={handleResult}
          getNextParams={(currentParams) => ({
            page: currentParams ? currentParams.page + 1 : 1,
            limit: 4,
          })}
          hasMore={(result) => result?.hasMore || false}
          initialParams={{ page: 1, limit: 4 }}
          loadingMessage="Loading products..."
          noMoreMessage="You've viewed all products!"
          buttonText="Load More Products"
        />
      </div>
    </div>
  );
}
