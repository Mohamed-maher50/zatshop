const product = {
  _id: "prod001",
  title: "Premium T-Shirt Collection",
  description:
    "A versatile t-shirt with multiple color and size options. Made from organic cotton and designed for comfort.",
  price: 250, // default/base price
  priceAfterDiscount: 220,
  isFreeShipping: true,
  imageCover: {
    url: "https://images.unsplash.com/photo-1593032465171-f4ff06f1e9b0?auto=format&fit=crop&w=1200&q=80",
  },
  images: [
    {
      url: "https://images.unsplash.com/photo-1593032465171-f4ff06f1e9b0?auto=format&fit=crop&w=800&q=80",
      alt: "T-Shirt front",
    },
    {
      url: "https://images.unsplash.com/photo-1618354691745-b3d134bba639?auto=format&fit=crop&w=800&q=80",
      alt: "T-Shirt back",
    },
    {
      url: "https://images.unsplash.com/photo-1625768921663-6d5fbbd1b8de?auto=format&fit=crop&w=800&q=80",
      alt: "T-Shirt side",
    },
    {
      url: "https://images.unsplash.com/photo-1585386959984-a4155228f3e1?auto=format&fit=crop&w=800&q=80",
      alt: "T-Shirt folded",
    },
    {
      url: "https://images.unsplash.com/photo-1600181957207-bb356e1377ff?auto=format&fit=crop&w=800&q=80",
      alt: "T-Shirt lifestyle",
    },
    {
      url: "https://images.unsplash.com/photo-1618354754181-7c2cf5d2b4f3?auto=format&fit=crop&w=800&q=80",
      alt: "T-Shirt on model",
    },
    {
      url: "https://images.unsplash.com/photo-1625768921663-6d5fbbd1b8de?auto=format&fit=crop&w=800&q=80",
      alt: "T-Shirt hanging",
    },
  ],
  slug: "premium-tshirt-collection",
  TotalStock: 300,
  TotalSold: 125,
  category: { _id: "cat001", name: "Clothing", slug: "clothing" },
  subcategory: [{ _id: "sub001", name: "T-Shirts", slug: "t-shirts" }],
  brand: {
    _id: "brand001",
    name: "StyleMax",
    slug: "stylemax",
    logo: {
      url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=400&q=80",
    },
  },
  ratingsAverage: 4.6,
  ratingsQuantity: 35,
  options: [
    { name: "Color", values: ["Black", "White", "Gray", "Blue", "Red"] },
    { name: "Size", values: ["S", "M", "L", "XL", "XXL"] },
  ],
  variants: [
    // Black
    {
      attributes: { Color: "Black", Size: "S" },
      price: 250,
      stock: 20,
      sku: "BLK-S",
      images: [
        {
          url: "https://images.unsplash.com/photo-1593032465171-f4ff06f1e9b0?auto=format&fit=crop&w=800&q=80",
          alt: "Black S",
        },
      ],
    },
    {
      attributes: { Color: "Black", Size: "M" },
      price: 250,
      stock: 25,
      sku: "BLK-M",
      images: [
        {
          url: "https://images.unsplash.com/photo-1618354691745-b3d134bba639?auto=format&fit=crop&w=800&q=80",
          alt: "Black M",
        },
      ],
    },
    {
      attributes: { Color: "Black", Size: "L" },
      price: 250,
      stock: 30,
      sku: "BLK-L",
      images: [
        {
          url: "https://images.unsplash.com/photo-1625768921663-6d5fbbd1b8de?auto=format&fit=crop&w=800&q=80",
          alt: "Black L",
        },
      ],
    },
    // White
    {
      attributes: { Color: "White", Size: "S" },
      price: 245,
      stock: 15,
      sku: "WHT-S",
      images: [
        {
          url: "https://images.unsplash.com/photo-1585386959984-a4155228f3e1?auto=format&fit=crop&w=800&q=80",
          alt: "White S",
        },
      ],
    },
    {
      attributes: { Color: "White", Size: "M" },
      price: 245,
      stock: 20,
      sku: "WHT-M",
      images: [
        {
          url: "https://images.unsplash.com/photo-1600181957207-bb356e1377ff?auto=format&fit=crop&w=800&q=80",
          alt: "White M",
        },
      ],
    },
    {
      attributes: { Color: "White", Size: "L" },
      price: 245,
      stock: 22,
      sku: "WHT-L",
      images: [
        {
          url: "https://images.unsplash.com/photo-1618354754181-7c2cf5d2b4f3?auto=format&fit=crop&w=800&q=80",
          alt: "White L",
        },
      ],
    },
    // Blue
    {
      attributes: { Color: "Blue", Size: "M" },
      price: 260,
      stock: 12,
      sku: "BLU-M",
      images: [
        {
          url: "https://images.unsplash.com/photo-1625768921663-6d5fbbd1b8de?auto=format&fit=crop&w=800&q=80",
          alt: "Blue M",
        },
      ],
    },
    {
      attributes: { Color: "Blue", Size: "L" },
      price: 260,
      stock: 18,
      sku: "BLU-L",
      images: [
        {
          url: "https://images.unsplash.com/photo-1618354691745-b3d134bba639?auto=format&fit=crop&w=800&q=80",
          alt: "Blue L",
        },
      ],
    },
    // Red
    {
      attributes: { Color: "Red", Size: "S" },
      price: 255,
      stock: 10,
      sku: "RED-S",
      images: [
        {
          url: "https://images.unsplash.com/photo-1600181957207-bb356e1377ff?auto=format&fit=crop&w=800&q=80",
          alt: "Red S",
        },
      ],
    },
    {
      attributes: { Color: "Red", Size: "M" },
      price: 255,
      stock: 14,
      sku: "RED-M",
      images: [
        {
          url: "https://images.unsplash.com/photo-1618354754181-7c2cf5d2b4f3?auto=format&fit=crop&w=800&q=80",
          alt: "Red M",
        },
      ],
    },
  ],
};
