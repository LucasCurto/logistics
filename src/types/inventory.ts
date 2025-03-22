export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  minStockLevel: number;
  unitCost: number;
  unitPrice: number;
  supplier: string;
  location: string;
  lastUpdated: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  type: "incoming" | "outgoing";
  quantity: number;
  source: string; // supplier or internal location
  destination: string; // customer or internal location
  date: string;
  notes?: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: RecipeIngredient[];
  sellingPrice: number;
  totalCost: number;
  profitMargin: number;
  createdAt: string;
  updatedAt: string;
}

export interface RecipeIngredient {
  productId: string;
  productName: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
}

export interface StockAlert {
  productId: string;
  productName: string;
  currentStock: number;
  minStockLevel: number;
  deficit: number;
}

export interface ReportFilter {
  dateRange: {
    from: Date;
    to: Date;
  };
  products?: string[];
  categories?: string[];
  movementTypes?: ("incoming" | "outgoing")[];
}

export type UserRole = "admin" | "manager" | "staff";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
