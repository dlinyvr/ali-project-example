import { ArrowUpRight, BarChart3, FileText, MoreVertical } from 'lucide-react';
import { type Project } from '@/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProjectCardProps {
  project: Project;
  onViewDetails: (id: string) => void;
}

export function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  const utilizationPercentage = (project.usedBudget / project.totalBudget) * 100;
  
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">{project.name}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onViewDetails(project.id)}>
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>Export Data</DropdownMenuItem>
            <DropdownMenuItem>Archive Project</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              {project.department}
            </p>
            <p className="text-2xl font-bold">
              ${project.usedBudget.toLocaleString()}
              <span className="text-sm text-muted-foreground ml-1">
                / ${project.totalBudget.toLocaleString()}
              </span>
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {project.categories.length} Categories
            </span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Budget Utilization</span>
            <span className="text-sm text-muted-foreground">
              {utilizationPercentage.toFixed(1)}%
            </span>
          </div>
          <Progress value={utilizationPercentage} className="h-2" />
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Last updated {new Date(project.lastUpdated).toLocaleDateString()}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-primary hover:text-primary-foreground"
            onClick={() => onViewDetails(project.id)}
          >
            View Details
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}