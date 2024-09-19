import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

export default function Component() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/items")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setLoading(false);
      });
  }, []);

  const categories = items.reduce(
    (acc: { [key: string]: Product[] }, item: Product) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {}
  );

  if (loading) {
    return (
      <div className="container mx-auto my-8">
        <Skeleton className="h-20 w-3/4 mx-auto mb-8" />
        {[...Array(3)].map((_, index) => (
          <div key={index} className="mb-8">
            <Skeleton className="h-12 w-1/4 mb-4" />
            <div className="grid grid-cols-2 gap-6">
              {[...Array(4)].map((_, idx) => (
                <Skeleton key={idx} className="h-[330px]" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 px-4">
      <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg shadow-lg mb-8">
        <h1 className="text-4xl font-bold mb-2">Products by Category</h1>
        <p className="text-xl">Discover the best products in each category</p>
      </div>

      {Object.keys(categories).map((category) => (
        <div key={category} className="mb-8">
          <div className="w-full border-l-4 border-blue-500 pl-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{category}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories[category].map((product) => (
              <Card
                key={product.id}
                className="flex flex-row h-[330px] overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-2/3 p-4 overflow-y-auto">
                  <h3 className="text-lg font-bold mb-2 text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Price: {product.price}
                  </p>
                  <p className="text-sm text-gray-700">{product.description}</p>
                </div>
                <div className="w-1/3 h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-1/2 rounded-bl-xl"
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
