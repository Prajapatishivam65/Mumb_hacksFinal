import { useGetDashboardMetricsQuery } from "@/state/api";
import { ShoppingBag } from "lucide-react";
import React from "react";
import Rating from "../(components)/Rating";
import Image from "next/image";

const CardPopularProducts = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2">
            Popular Products
          </h3>
          <hr />
          <div className="overflow-auto h-full">
            {dashboardMetrics?.popularProducts.map((product) => (
              <div
                key={product.productId}
                className="flex items-center justify-between gap-3 px-5 py-7 border-b"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={`data:image/jpeg;base64,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`}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="rounded-lg w-14 h-14"
                  />
                  <div className="flex flex-col justify-between gap-1">
                    <div className="font-bold text-gray-700">
                      {product.name}
                    </div>
                    <div className="flex text-sm items-center">
                      <span className="font-bold text-blue-500 text-xs">
                        ₹{product.price}
                      </span>
                      <span className="mx-2">|</span>
                      <Rating rating={product.rating || 0} />
                    </div>
                  </div>
                </div>

                <div className="text-xs flex items-center">
                  <button className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  {Math.round(product.stockQuantity / 1000)}k Sold
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProducts;
