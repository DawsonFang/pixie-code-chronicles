import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface DailyNoteProps {
  content: string;
  time: string;
}

const DailyNote = ({ content, time }: DailyNoteProps) => {
  return (
    <Card className="border-l-4 border-l-accent bg-card/50 backdrop-blur-sm hover:bg-card transition-all duration-300">
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-accent text-sm">
          <Clock className="w-4 h-4" />
          <span>{time}</span>
        </div>
        <p className="text-foreground">{content}</p>
      </div>
    </Card>
  );
};

export default DailyNote;
