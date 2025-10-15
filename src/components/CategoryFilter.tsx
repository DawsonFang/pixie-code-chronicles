import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  activeCategory: "全部" | "筆記" | "文件";
  onCategoryChange: (category: "全部" | "筆記" | "文件") => void;
}

const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
  const categories: ("全部" | "筆記" | "文件")[] = ["全部", "筆記", "文件"];

  return (
    <div className="flex gap-3 flex-wrap">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          onClick={() => onCategoryChange(category)}
          className={`
            transition-all duration-300
            ${activeCategory === category 
              ? "bg-gradient-primary shadow-glow-primary" 
              : "hover:border-primary/50"
            }
          `}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
