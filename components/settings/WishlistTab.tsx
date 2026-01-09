"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, ShoppingCart, Search, Filter } from "lucide-react";
import Image from "next/image";

const initialWishlist = [
  {
    id: 1,
    title: "Mechanical Keyboard",
    price: 149.99,
    category: "Electronics",
    image: "/mechanical-keyboard.png",
    available: true,
  },
  {
    id: 2,
    title: "Wireless Mouse",
    price: 79.99,
    category: "Electronics",
    image: "/field-mouse.png",
    available: false,
  },
  {
    id: 3,
    title: "Noise Cancelling Headphones",
    price: 299.99,
    category: "Audio",
    image: "/diverse-people-listening-headphones.png",
    available: true,
  },
  {
    id: 4,
    title: "Ergonomic Desk Chair",
    price: 499.99,
    category: "Furniture",
    image: "/comfortable-armchair.png",
    available: true,
  },
];

export function WishlistTab() {
  const [items, setItems] = useState(initialWishlist);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "all" || item.category === category)
  );

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search wishlist..."
            className="pl-9 bg-card border-border"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-[180px] bg-card border-border">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Audio">Audio</SelectItem>
            <SelectItem value="Furniture">Furniture</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden bg-card border-border flex flex-col group"
          >
            <div className="relative aspect-square overflow-hidden bg-muted">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {!item.available && (
                <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
                  <Badge
                    variant="secondary"
                    className="font-semibold uppercase tracking-wider"
                  >
                    Out of Stock
                  </Badge>
                </div>
              )}
            </div>
            <CardContent className="p-4 flex-1">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  {item.category}
                </p>
                <p className="font-bold text-lg">${item.price}</p>
              </div>
              <h3 className="font-semibold text-lg line-clamp-1 mb-1">
                {item.title}
              </h3>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
              <Button
                className="flex-1 gap-2"
                variant={item.available ? "default" : "outline"}
                disabled={!item.available}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-20 bg-card rounded-lg border border-dashed border-border">
          <p className="text-muted-foreground">
            No items found in your wishlist.
          </p>
        </div>
      )}
    </div>
  );
}
