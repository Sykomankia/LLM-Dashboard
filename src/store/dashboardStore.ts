import { create } from 'zustand';

export type WidgetType = 'tokenUsage' | 'latency' | 'cost';

export interface Widget {
  id: string;
  type: WidgetType;
  layout: {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

interface DashboardState {
  widgets: Widget[];
  addWidget: (type: WidgetType) => void;
  removeWidget: (id: string) => void;
  updateLayout: (layouts: Widget[]) => void;
  loadFromStorage: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  widgets: [],
  addWidget: (type) => {
    const id = `widget-${Date.now()}`;
    const newWidget: Widget = {
      id,
      type,
      layout: {
        i: id,
        x: 0,
        y: Infinity,
        w: 4,
        h: 2,
      },
    };
    const updatedWidgets = [...get().widgets, newWidget];
    localStorage.setItem('dashboard', JSON.stringify(updatedWidgets));
    set({ widgets: updatedWidgets });
  },
  removeWidget: (id) => {
    const updatedWidgets = get().widgets.filter((w) => w.id !== id);
    localStorage.setItem('dashboard', JSON.stringify(updatedWidgets));
    set({ widgets: updatedWidgets });
  },
  updateLayout: (layouts) => {
    localStorage.setItem('dashboard', JSON.stringify(layouts));
    set({ widgets: layouts });
  },
  loadFromStorage: () => {
    const saved = localStorage.getItem('dashboard');
    if (saved) {
      set({ widgets: JSON.parse(saved) });
    }
  },
}));
