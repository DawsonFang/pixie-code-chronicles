import { useState } from "react";
import { Sparkles, BookOpen, PenTool } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import DailyNote from "@/components/DailyNote";
import CategoryFilter from "@/components/CategoryFilter";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<"全部" | "筆記" | "文件">("全部");

  const articles = [
    {
      id: 1,
      title: "React Hooks 完整指南",
      excerpt: "深入探討 React Hooks 的使用方式與最佳實踐，包含 useState、useEffect 等常用 hooks 的詳細說明。",
      date: "2025-10-15",
      category: "文件" as const,
      tags: ["React", "JavaScript", "前端開發"],
    },
    {
      id: 2,
      title: "今日學習：TypeScript 泛型",
      excerpt: "學習了 TypeScript 泛型的基本概念和應用場景，可以讓程式碼更加靈活和可重用。",
      date: "2025-10-15",
      category: "筆記" as const,
      tags: ["TypeScript", "學習筆記"],
    },
    {
      id: 3,
      title: "Tailwind CSS 設計系統建立",
      excerpt: "如何使用 Tailwind CSS 建立一套完整的設計系統，包含顏色、字體、間距等規範。",
      date: "2025-10-14",
      category: "文件" as const,
      tags: ["CSS", "設計", "Tailwind"],
    },
    {
      id: 4,
      title: "效能優化心得",
      excerpt: "今天優化了專案的載入速度，使用了 lazy loading 和 code splitting 技術。",
      date: "2025-10-14",
      category: "筆記" as const,
      tags: ["效能優化", "Web"],
    },
  ];

  const dailyNotes = [
    { id: 1, content: "完成了部落格的初始設計，採用了科技感配色", time: "14:30" },
    { id: 2, content: "研究了新的動畫效果，準備應用到專案中", time: "11:20" },
    { id: 3, content: "閱讀了關於 Web Vitals 的文章", time: "09:15" },
  ];

  const filteredArticles = articles.filter(
    (article) => activeCategory === "全部" || article.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-accent opacity-60" />
        
        <div className="relative z-10 text-center space-y-6 px-4">
          <div className="inline-flex items-center gap-2 text-primary animate-float">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            我的科技日誌
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            記錄學習旅程 · 分享技術心得 · 探索程式世界
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Daily Notes Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <PenTool className="w-6 h-6 text-accent" />
            <h2 className="text-3xl font-bold">今日筆記</h2>
            <div className="h-px flex-1 bg-gradient-primary opacity-30" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dailyNotes.map((note) => (
              <DailyNote key={note.id} content={note.content} time={note.time} />
            ))}
          </div>
        </section>

        {/* Articles Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 flex-wrap">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">文章列表</h2>
            <div className="h-px flex-1 bg-gradient-primary opacity-30" />
          </div>

          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <div className="grid gap-6 md:grid-cols-2">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                excerpt={article.excerpt}
                date={article.date}
                category={article.category}
                tags={article.tags}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 我的科技日誌 · 用心記錄每一天</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
