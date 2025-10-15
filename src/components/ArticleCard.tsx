import { Calendar, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: "筆記" | "文件";
  tags?: string[];
}

const ArticleCard = ({ title, excerpt, date, category, tags = [] }: ArticleCardProps) => {
  return (
    <Card className="group relative overflow-hidden border-border bg-card hover:shadow-card transition-all duration-300 hover:scale-[1.02] cursor-pointer">
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      
      <div className="relative p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Badge 
            variant={category === "文件" ? "default" : "secondary"}
            className="text-xs font-medium"
          >
            {category}
          </Badge>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground line-clamp-2">
            {excerpt}
          </p>
        </div>

        {tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-muted-foreground" />
            {tags.map((tag) => (
              <span key={tag} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ArticleCard;
