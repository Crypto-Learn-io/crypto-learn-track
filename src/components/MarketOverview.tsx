
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, BarChart, LineChart } from "lucide-react";
import {
  Area,
  AreaChart as RechartsAreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

// Mock data for the chart
const mockChartData = [
  { name: "Jan", value: 40000 },
  { name: "Feb", value: 45000 },
  { name: "Mar", value: 47000 },
  { name: "Apr", value: 42000 },
  { name: "May", value: 50000 },
  { name: "Jun", value: 55000 },
  { name: "Jul", value: 60000 },
];

const MarketOverview = () => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Market Overview</CardTitle>
        <Tabs defaultValue="area">
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
            <RechartsAreaChart
              data={mockChartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
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
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'BTC']}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#8B5CF6" 
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </RechartsAreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketOverview;
