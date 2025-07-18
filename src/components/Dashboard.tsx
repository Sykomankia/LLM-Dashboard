import React, { useEffect, useState } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useDashboardStore } from '../store/dashboardStore';
import AddWidgetModal from './AddWidgetModal';
import TokenUsageWidget from './widgets/TokenUsageWidget';
import LatencyWidget from './widgets/LatencyWidget';
import CostWidget from './widgets/CostWidget';
import type { Widget } from '../store/dashboardStore';

const Dashboard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const updateLayout = useDashboardStore((state) => state.updateLayout);
  const loadFromStorage = useDashboardStore((state) => state.loadFromStorage);
  const widgets = useDashboardStore((state: { widgets: Widget[] }) => state.widgets);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  const handleLayoutChange = (newLayout: any) => {
    const updatedWidgets = widgets.map((w) => {
      const updatedLayout = newLayout.find((l: any) => l.i === w.id);
      return {
        ...w,
        layout: {
          ...w.layout,
          ...updatedLayout,
        },
      };
    });
    updateLayout(updatedWidgets);
  };

  const renderWidget = (type: string) => {
    switch (type) {
      case 'tokenUsage':
        return <TokenUsageWidget />;
      case 'latency':
        return <LatencyWidget />;
      case 'cost':
        return <CostWidget />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setShowModal(true)}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded"
      >
        Add Widget
      </button>

      <button
        onClick={() => {
          localStorage.removeItem('dashboard');
          window.location.reload();
        }}
        className="ml-4 px-4 py-2 bg-red-600 text-white rounded"
      >
        Clear All
      </button>

      {showModal && <AddWidgetModal onClose={() => setShowModal(false)} />}

      <GridLayout
        className="layout"
        cols={12}
        rowHeight={100}
        width={1200}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".drag-handle"
      >
        {widgets.map((widget) => (
          <div
            key={widget.id}
            data-grid={widget.layout}
            className="bg-white shadow rounded overflow-hidden"
          >
            <div className="flex justify-between items-center p-2 bg-gray-200 cursor-move drag-handle">
              <span className="font-semibold capitalize">{widget.type}</span>
            </div>
            <div className="p-4">{renderWidget(widget.type)}</div>
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default Dashboard;
