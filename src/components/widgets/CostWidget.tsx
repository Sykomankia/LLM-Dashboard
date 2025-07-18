import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCostAnalysis } from '../../services/mockApi';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#6366f1', '#ec4899', '#f59e0b'];

const CostWidget: React.FC = () => {
const { data, isLoading, error } = useQuery<Array<{ model_name: string; cost: number }>>({
  queryKey: ['cost-analysis'],
  queryFn: fetchCostAnalysis,
});

  if (isLoading) return <p>Loading Cost Data...</p>;
  if (error) return <p>Error loading cost data</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Cost by Model</h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data as any[]}
            dataKey="cost"
            nameKey="model_name"
            cx="50%"
            cy="50%"
            outerRadius={70}
            label
          >
            {(data as any[]).map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CostWidget;
