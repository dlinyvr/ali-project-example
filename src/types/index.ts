export interface Project {
  id: string;
  name: string;
  department: string;
  year: number;
  totalBudget: number;
  usedBudget: number;
  status: 'active' | 'completed' | 'archived';
  categories: Category[];
  lastUpdated: string;
}

export interface Category {
  id: string;
  name: string;
  budget: number;
  spent: number;
  documents: Document[];
}

export interface Document {
  id: string;
  name: string;
  type: 'invoice' | 'receipt' | 'budget';
  status: 'processing' | 'verified' | 'rejected';
  confidenceScore: number;
  amount: number;
  date: string;
  category: string;
  url: string;
}

export interface ProcessingStatus {
  status: 'idle' | 'processing' | 'completed' | 'error';
  progress: number;
  message: string;
}