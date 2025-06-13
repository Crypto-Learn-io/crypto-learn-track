import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, BarChart, LineChart } from "lucide-react";
import {
  Area,
  AreaChart as RechartsAreaChart,
  Bar,
  BarChart as RechartsBarChart,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { useQuery } from "@tanstack/react-query";

// Function to fetch historical data for Bitcoin
const fetchHistoricalData = async () => {
  try {
    // Note: In a real app, this would need to be proxied through a backend
    // or use a CORS-enabled API. For demonstration, we're using mock data similar to Yahoo Finance
    
    // Simulating a fetch delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate last 30 days of mock data
    const today = new Date();
    const data = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() - (29 - i));
      
      // Create some realistic price fluctuations
      const basePrice = 50000 + (Math.random() * 10000);
      const volatilityFactor = 0.05;  // 5% max daily change
      const dailyChange = basePrice * volatilityFactor * (Math.random() * 2 - 1);
      
      return {
        date: date.toLocaleDateString("en-US", { month: 'short', day: 'numeric' }),
        price: Math.round(basePrice + dailyChange * i),
        volume: Math.round(100000 + Math.random() * 50000)
      };
    });
    
    return data;
  } catch (error) {
    console.error("Failed to fetch historical data:", error);
    throw new Error("Failed to load market data");
  }
};

const MarketOverview = () => {
  const [chartType, setChartType] = useState("area");
  
  const { data: historicalData, isLoading, error } = useQuery({
    queryKey: ['historicalData'],
    queryFn: fetchHistoricalData,
  });

  if (isLoading) {
    return (
      <Card className="col-span-1 md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Market Overview</CardTitle>
          <div className="h-8 w-24 bg-muted/20 animate-pulse rounded"></div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-muted-foreground animate-pulse-gentle">Loading market data...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="col-span-1 md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-destructive">Failed to load market data. Please try again later.</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Bitcoin Market History</CardTitle>
        <Tabs defaultValue="area" value={chartType} onValueChange={setChartType}>
          <TabsList className="grid grid-cols-3 h-8 w-auto">
            <TabsTrigger value="area" className="h-7 px-2">
              <AreaChart className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="line" className="h-7 px-2">
              <LineChart className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="bar" className="h-7 px-2">
              <BarChart className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "area" ? (
              <RechartsAreaChart
                data={historicalData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--muted-foreground)' }} 
                />
                <YAxis 
                  hide={true}
                  domain={['dataMin - 5000', 'dataMax + 5000']} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    borderColor: 'var(--border)',
                    borderRadius: '0.5rem' 
                  }} 
                  itemStyle={{ color: 'var(--foreground)' }}
                  formatter={(value: number) => [formatCurrency(value), 'BTC']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#8B5CF6" 
                  fillOpacity={1} 
                  fill="url(#colorPrice)" 
                />
              </RechartsAreaChart>
            ) : chartType === "line" ? (
              <RechartsLineChart
                data={historicalData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--muted-foreground)' }} 
                />
                <YAxis 
                  hide={true}
                  domain={['dataMin - 5000', 'dataMax + 5000']} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    borderColor: 'var(--border)',
                    borderRadius: '0.5rem' 
                  }} 
                  itemStyle={{ color: 'var(--foreground)' }}
                  formatter={(value: number) => [formatCurrency(value), 'BTC']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#8B5CF6" 
                  dot={{ r: 1 }}
                  strokeWidth={2}
                />
              </RechartsLineChart>
            ) : (
              <RechartsBarChart
                data={historicalData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--muted-foreground)' }} 
                />
                <YAxis 
                  hide={true}
                  domain={['dataMin - 5000', 'dataMax + 5000']} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    borderColor: 'var(--border)',
                    borderRadius: '0.5rem' 
                  }} 
                  itemStyle={{ color: 'var(--foreground)' }}
                  formatter={(value: number) => [formatCurrency(value), 'BTC']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Bar 
                  dataKey="price" 
                  fill="#8B5CF6" 
                  radius={[4, 4, 0, 0]}
                />
              </RechartsBarChart>
            )}
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-xs text-muted-foreground text-center">
          Data updates hourly. Last updated: {new Date().toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketOverview;
