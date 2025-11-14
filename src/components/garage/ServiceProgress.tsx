import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
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

  const formatKm = (km: number) => {
    const roundedKm = Math.abs(Math.round(km / 100) * 100);
    return `${roundedKm.toLocaleString()} km`;
  };

  const dueText = isOverdue 
    ? <span className="text-red-400">Overdue by {formatKm(service.dueInKm)}</span>
    : <span className="text-foreground">Due in {formatKm(service.dueInKm)}</span>;

  return (
    <div className="p-3 rounded-lg bg-card/50 flex items-center gap-3">
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium">{service.name}</span>
          <span className="text-xs text-muted-foreground">{dueText}</span>
        </div>
        <Progress value={service.progress} className="h-2 [&>*]:bg-transparent" indicatorClassName={cn("transition-all", progressColor)} />
      </div>
       <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={onShowCalculation}>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">Show calculation for {service.name}</span>
        </Button>
    </div>
  );
}
