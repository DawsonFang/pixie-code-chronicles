import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const COMMON_TAGS = [
  "React", "TypeScript", "JavaScript", "Python", "Node.js",
  "前端開發", "後端開發", "全端開發", "CSS", "Tailwind",
  "資料庫", "API", "效能優化", "測試", "部署",
  "Git", "Docker", "AI", "機器學習", "演算法"
];

const CreatePost = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: [] as string[],
  });
  const [customTag, setCustomTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.category) {
      toast({
        title: "請填寫所有必填欄位",
        description: "標題、內容和分類為必填項目",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // 時空穿梭動畫效果
    setTimeout(() => {
      toast({
        title: "發布成功！",
        description: `已成功新增${formData.category}`,
      });

      setTimeout(() => {
        navigate("/");
      }, 500);
    }, 1500);
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const addCustomTag = () => {
    const trimmedTag = customTag.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag]
      }));
      setCustomTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tagToRemove)
    }));
  };

  const handleCustomTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomTag();
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center wormhole-submit">
          <div className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse">
            穿梭中...
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 group"
        >
          <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          返回首頁
        </Button>

        <Card className="border-primary/20 shadow-glow">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              新增內容
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              建立新的筆記或技術文件
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-foreground font-medium">
                  分類 <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger id="category" className="bg-background/50 border-primary/20 focus:border-primary">
                    <SelectValue placeholder="選擇分類" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="筆記">📝 一般筆記</SelectItem>
                    <SelectItem value="文件">📚 技術文件</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="text-foreground font-medium">
                  標題 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="輸入標題..."
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="bg-background/50 border-primary/20 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-foreground font-medium">
                  內容 <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="content"
                  placeholder="寫下你的內容..."
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="min-h-[200px] bg-background/50 border-primary/20 focus:border-primary resize-none"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-foreground font-medium">
                  標籤
                </Label>
                
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="輸入自訂標籤..."
                      value={customTag}
                      onChange={(e) => setCustomTag(e.target.value)}
                      onKeyDown={handleCustomTagKeyDown}
                      className="bg-background/50 border-primary/20 focus:border-primary"
                    />
                    <Button
                      type="button"
                      onClick={addCustomTag}
                      variant="outline"
                      className="border-primary/30 hover:border-primary"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">常用標籤：</p>
                    <div className="flex flex-wrap gap-2">
                      {COMMON_TAGS.map((tag) => (
                        <Badge
                          key={tag}
                          variant={formData.tags.includes(tag) ? "default" : "outline"}
                          className={`cursor-pointer transition-all hover:scale-105 ${
                            formData.tags.includes(tag)
                              ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                              : "border-primary/30 hover:border-primary"
                          }`}
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {formData.tags.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">已選擇的標籤：</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag) => (
                          <Badge
                            key={tag}
                            className="bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                          >
                            {tag}
                            <X
                              className="ml-1 h-3 w-3 cursor-pointer hover:text-destructive"
                              onClick={() => removeTag(tag)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                size="lg"
                disabled={isSubmitting}
              >
                <Plus className="mr-2" />
                {isSubmitting ? "發布中..." : "發布內容"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatePost;
