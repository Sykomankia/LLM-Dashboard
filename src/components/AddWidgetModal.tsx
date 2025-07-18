import React from 'react';
import { useDashboardStore } from '../store/dashboardStore';

interface Props {
  onClose: () => void;
}

const AddWidgetModal: React.FC<Props> = ({ onClose }) => {
  const addWidget = useDashboardStore((state) => state.addWidget);

  const handleAdd = (type: 'tokenUsage' | 'latency' | 'cost') => {
    addWidget(type);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-lg font-semibold mb-4">Add Widget</h2>
        <button onClick={() => handleAdd('tokenUsage')} className="block w-full py-2 mb-2 bg-blue-500 text-white rounded">Token Usage Over Time</button>
        <button onClick={() => handleAdd('latency')} className="block w-full py-2 mb-2 bg-green-500 text-white rounded">Latency Distribution</button>
        <button onClick={() => handleAdd('cost')} className="block w-full py-2 bg-pink-500 text-white rounded">Cost Analysis</button>
        <button onClick={onClose} className="mt-4 text-sm text-gray-600 underline">Cancel</button>
      </div>
    </div>
  );
};

export default AddWidgetModal;
