import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchLatencyDistribution } from '../../services/mockApi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const LatencyWidget: React.FC = () => {
const { data, isLoading, error } = useQuery<Array<{ latency_ms: number; request_count: number }>>({
  queryKey: ['latency-distribution'],
  queryFn: fetchLatencyDistribution,
});

  if (isLoading) return <p>Loading Latency Data...</p>;
  if (error) return <p>Error loading latency data</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Latency Distribution</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data as any[]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="latency_ms" tickFormatter={(tick) => `${tick} ms`} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="request_count" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LatencyWidget;
