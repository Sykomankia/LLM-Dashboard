import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTokenUsage } from '../../services/mockApi';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const TokenUsageWidget: React.FC = () => {
const { data, isLoading, error } = useQuery<Array<{ timestamp: string; tokens: number }>>({
  queryKey: ['token-usage'],
  queryFn: fetchTokenUsage,
});

  if (isLoading) return <p>Loading Token Usage...</p>;
  if (error) return <p>Error loading token usage data</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Token Usage Over Time</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data as any[]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" tickFormatter={(tick) => new Date(tick).toLocaleTimeString()} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="tokens" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TokenUsageWidget;
