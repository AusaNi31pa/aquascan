import React, { createContext, useContext, useState } from "react";

export interface CollectionItem {
  id: string;
  variety: string;
  circleLine: string;
  weight: string;
  date: string;
  time: string;
  image: string;
  analyzed: boolean;
}

export interface HistoryItem {
  id: string;
  variety: string;
  circleLine: string;
  weight: string;
  date: string;
  time: string;
  image: string;
  status: string;
  percentage1: number;
  percentage2: number;
  analysisDate: string;
  analysisTime: string;
}

interface DataContextType {
  collectionItems: CollectionItem[];
  historyItems: HistoryItem[];
  selectedItem: CollectionItem | null;
  addCollectionItem: (item: Omit<CollectionItem, "id" | "analyzed">) => void;
  updateCollectionItem: (id: string, item: Partial<CollectionItem>) => void;
  deleteCollectionItem: (id: string) => void;
  selectItem: (item: CollectionItem) => void;
  saveAnalysisResult: (
    itemId: string,
    status: string,
    percentage1: number,
    percentage2: number
  ) => void;
  getUnarialyzedItems: () => CollectionItem[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [collectionItems, setCollectionItems] = useState<CollectionItem[]>([
    {
      id: "1",
      variety: "Mandarin",
      circleLine: "32 cm",
      weight: "250g",
      date: "Jan 15, 2026",
      time: "10:30 AM",
      image:
        "https://images.unsplash.com/photo-1569410849066-a82e2b7c3df7?w=100&q=80",
      analyzed: false,
    },
    {
      id: "2",
      variety: "Sai Nam Phueng",
      circleLine: "28 cm",
      weight: "180g",
      date: "Jan 14, 2026",
      time: "02:15 PM",
      image:
        "https://images.unsplash.com/photo-1599599810694-b5ac4dd63edb?w=100&q=80",
      analyzed: false,
    },
  ]);

  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([
    {
      id: "h1",
      variety: "Tangerine",
      circleLine: "30 cm",
      weight: "200g",
      date: "Jan 13, 2026",
      time: "09:45 AM",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&q=80",
      status: "Excellent",
      percentage1: 95,
      percentage2: 88,
      analysisDate: "Jan 13, 2026",
      analysisTime: "09:50 AM",
    },
  ]);

  const [selectedItem, setSelectedItem] = useState<CollectionItem | null>(null);

  const addCollectionItem = (
    item: Omit<CollectionItem, "id" | "analyzed">
  ) => {
    const newItem: CollectionItem = {
      ...item,
      id: String(Date.now()),
      analyzed: false,
    };
    setCollectionItems([newItem, ...collectionItems]);
  };

  const updateCollectionItem = (
    id: string,
    item: Partial<CollectionItem>
  ) => {
    setCollectionItems(
      collectionItems.map((i) => (i.id === id ? { ...i, ...item } : i))
    );
  };

  const deleteCollectionItem = (id: string) => {
    setCollectionItems(collectionItems.filter((i) => i.id !== id));
  };

  const selectItem = (item: CollectionItem) => {
    setSelectedItem(item);
  };

  const saveAnalysisResult = (
    itemId: string,
    status: string,
    percentage1: number,
    percentage2: number
  ) => {
    const item = collectionItems.find((i) => i.id === itemId);
    if (!item) return;

    // Add to history
    const historyItem: HistoryItem = {
      id: `h${Date.now()}`,
      variety: item.variety,
      circleLine: item.circleLine,
      weight: item.weight,
      date: item.date,
      time: item.time,
      image: item.image,
      status,
      percentage1,
      percentage2,
      analysisDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      analysisTime: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setHistoryItems([historyItem, ...historyItems]);

    // Remove from collection
    deleteCollectionItem(itemId);

    // Clear selected item
    setSelectedItem(null);
  };

  const getUnarialyzedItems = () => {
    return collectionItems.filter((item) => !item.analyzed);
  };

  return (
    <DataContext.Provider
      value={{
        collectionItems,
        historyItems,
        selectedItem,
        addCollectionItem,
        updateCollectionItem,
        deleteCollectionItem,
        selectItem,
        saveAnalysisResult,
        getUnarialyzedItems,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
