import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CalculatedService } from "@/lib/types";
import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";

interface ServiceProgressProps {
  service: CalculatedService;
  onShowCalculation: () => void;
}

export function ServiceProgress({ service, onShowCalculation }: ServiceProgressProps) {
  const isOverdue = service.status === 'overdue';
  const isDue = service.status === 'due';
  
  const progressColor = isOverdue ? 'bg-red-500' : isDue ? 'bg-yellow-500' : 'bg-accent';

  const formatDays = (days: number) => {
    if (days < 0) return `${Math.abs(days)} days overdue`;
    if (days < 30) return `${days} days`;
    const months = Math.floor(days / 30);
    return `~${months} month${months > 1 ? 's' : ''}`;
  };

  const formatKm = (km: number) => {
    return `${Math.abs(Math.round(km)).toLocaleString()} km`;
  };

  return (
    <Card className="bg-card/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{service.type} Service</CardTitle>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onShowCalculation}>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">Show calculation</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isOverdue 
              ? <span className="text-red-500">Service Overdue</span>
              : `Due in ${formatKm(service.dueInKm)}`
          }
        </div>
        <p className="text-xs text-muted-foreground">
            {isOverdue 
                ? `by ${formatKm(service.dueInKm)} or ${formatDays(service.dueInDays)}`
                : `or ${formatDays(service.dueInDays)}`
            }
        </p>
        <Progress value={service.progress} className="mt-4 h-2 [&>*]:bg-transparent" indicatorClassName={cn("transition-all", progressColor)} />
      </CardContent>
    </Card>
  );
}
