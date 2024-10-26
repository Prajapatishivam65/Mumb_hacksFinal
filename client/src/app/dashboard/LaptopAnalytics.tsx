import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ChevronDown,
  ChevronUp,
  Laptop,
  DollarSign,
  Star,
  Box,
} from "lucide-react";

// Define TypeScript interfaces
interface LaptopData {
  Name: string;
  Brand: string;
  Price: number;
  Rating: number;
  RAM_GB: number;
  Storage_capacity_GB: number;
  Display_size_inches: number;
  Graphics_GB?: number;
}

interface BrandAnalytics {
  brand: string;
  averagePrice: number;
  averageRating: number;
  totalModels: number;
}

const LaptopAnalytics = () => {
  const [data, setData] = useState<LaptopData[]>([]);
  const [analytics, setAnalytics] = useState<BrandAnalytics[]>([]);
  const [error, setError] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [bestValueLaptops, setBestValueLaptops] = useState<LaptopData[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const rows = text.split("\n");
          const headers = rows[0].split(",");

          const parsedData: LaptopData[] = rows
            .slice(1)
            .map((row) => {
              const values = row.split(",");
              return {
                Name: values[1] || "",
                Brand: values[2] || "",
                Price: parseFloat(values[3]) || 0,
                Rating: parseFloat(values[4]) || 0,
                RAM_GB: parseFloat(values[15]) || 0,
                Storage_capacity_GB: parseFloat(values[17]) || 0,
                Display_size_inches: parseFloat(values[23]) || 0,
                Graphics_GB: parseFloat(values[21]) || 0,
              };
            })
            .filter((item) => item.Price > 0);

          setData(parsedData);
          analyzeData(parsedData);
        } catch (err) {
          setError("Error parsing CSV file. Please check the format.");
        }
      };
      reader.readAsText(file);
    }
  };

  const analyzeData = (laptopData: LaptopData[]) => {
    const brandMap = new Map<
      string,
      { prices: number[]; ratings: number[]; count: number }
    >();

    laptopData.forEach((laptop) => {
      if (!brandMap.has(laptop.Brand)) {
        brandMap.set(laptop.Brand, { prices: [], ratings: [], count: 0 });
      }
      const brand = brandMap.get(laptop.Brand)!;
      brand.prices.push(laptop.Price);
      brand.ratings.push(laptop.Rating);
      brand.count++;
    });

    const analyticsData: BrandAnalytics[] = Array.from(brandMap.entries()).map(
      ([brand, data]) => ({
        brand,
        averagePrice: data.prices.reduce((a, b) => a + b, 0) / data.count,
        averageRating: data.ratings.reduce((a, b) => a + b, 0) / data.count,
        totalModels: data.count,
      })
    );

    setAnalytics(analyticsData.sort((a, b) => b.totalModels - a.totalModels));

    setMaxPrice(Math.max(...laptopData.map((l) => l.Price)));
    setMinPrice(Math.min(...laptopData.map((l) => l.Price)));

    const bestValue = laptopData
      .sort((a, b) => b.Rating / b.Price - a.Rating / a.Price)
      .slice(0, 5);
    setBestValueLaptops(bestValue);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="border rounded-lg shadow-md p-4">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Laptop className="w-6 h-6" />
          Laptop Analytics Dashboard
        </h2>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500 mb-4
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />

        {error && <div className="text-red-500">{error}</div>}

        {data.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Models
                  </p>
                  <p className="text-2xl font-bold">{data.length}</p>
                </div>
                <Box className="w-6 h-6 text-blue-500" />
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Avg Price</p>
                  <p className="text-2xl font-bold">
                    ₹
                    {(
                      data.reduce((acc, item) => acc + item.Price, 0) /
                      data.length
                    ).toFixed(2)}
                  </p>
                </div>
                <DollarSign className="w-6 h-6 text-green-500" />
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Avg Rating
                  </p>
                  <p className="text-2xl font-bold">
                    {(
                      data.reduce((acc, item) => acc + item.Rating, 0) /
                      data.length
                    ).toFixed(2)}
                  </p>
                </div>
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Price Range
                  </p>
                  <p className="text-2xl font-bold">
                    ₹{minPrice.toFixed(0)} - ₹{maxPrice.toFixed(0)}
                  </p>
                </div>
                <div className="flex flex-col">
                  <ChevronUp className="w-4 h-4 text-red-500" />
                  <ChevronDown className="w-4 h-4 text-green-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {analytics.length > 0 && (
          <div className="space-y-6">
            <div className="border rounded-lg shadow-md p-4">
              <h3 className="font-bold">Brand Performance</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={analytics}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="brand" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="averagePrice"
                      stroke="#8884d8"
                      name="Avg Price"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="averageRating"
                      stroke="#82ca9d"
                      name="Avg Rating"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="border rounded-lg shadow-md p-4">
              <h3 className="font-bold">Best Value Laptops</h3>
              <div className="space-y-4">
                {bestValueLaptops.map((laptop, index) => (
                  <div key={index} className="border rounded-lg p-2">
                    <h4 className="font-semibold">{laptop.Name}</h4>
                    <p>Brand: {laptop.Brand}</p>
                    <p>Price: ₹{laptop.Price.toFixed(2)}</p>
                    <p>Rating: {laptop.Rating}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaptopAnalytics;
