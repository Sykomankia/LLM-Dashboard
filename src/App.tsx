import React from 'react';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
        Dynamic LLM Monitoring Dashboard
      </h1>
      <Dashboard />
    </div>
  );
};

export default App;
