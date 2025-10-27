interface InventoryItem {
  sku: string;
  name: string;
  batch: string;
  expiry: string;
  qty: number;
  location: string;
}

interface TableInventoryProps {
  items: InventoryItem[];
}

export type { InventoryItem, TableInventoryProps };
