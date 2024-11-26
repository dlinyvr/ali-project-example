import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectGrid } from '@/components/dashboard/ProjectGrid';
import { UploadZone } from '@/components/upload/UploadZone';
import { type Project } from '@/types';

// Mock data for demonstration
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Q1 Marketing Campaign',
    department: 'Marketing',
    year: 2024,
    totalBudget: 100000,
    usedBudget: 45000,
    status: 'active',
    categories: [
      {
        id: 'cat1',
        name: 'Digital Advertising',
        budget: 50000,
        spent: 25000,
        documents: [],
      },
      {
        id: 'cat2',
        name: 'Content Creation',
        budget: 30000,
        spent: 15000,
        documents: [],
      },
    ],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'IT Infrastructure Upgrade',
    department: 'Technology',
    year: 2024,
    totalBudget: 250000,
    usedBudget: 100000,
    status: 'active',
    categories: [
      {
        id: 'cat3',
        name: 'Hardware',
        budget: 150000,
        spent: 60000,
        documents: [],
      },
      {
        id: 'cat4',
        name: 'Software Licenses',
        budget: 100000,
        spent: 40000,
        documents: [],
      },
    ],
    lastUpdated: new Date().toISOString(),
  },
];

function App() {
  const [projects] = useState<Project[]>(mockProjects);

  const handleFileSelect = async (files: FileList) => {
    // TODO: Implement file processing logic
    console.log('Processing files:', files);
  };

  const handleViewDetails = (id: string) => {
    // TODO: Implement project details view
    console.log('Viewing project:', id);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Budget Control</h1>
            <p className="text-muted-foreground">
              Manage and track your project budgets
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        <div className="grid gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Upload Documents</h2>
            <UploadZone onFileSelect={handleFileSelect} />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Active Projects</h2>
            <ProjectGrid
              projects={projects}
              onViewDetails={handleViewDetails}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;