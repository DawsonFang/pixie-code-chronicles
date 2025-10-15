import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";

const CreatePost = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  });

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

    toast({
      title: "發布成功！",
      description: `已成功新增${formData.category}`,
    });

    // 清空表單
    setFormData({
      title: "",
      content: "",
      category: "",
      tags: "",
    });
  };

  return (
    <div className="min-h-screen bg-background">
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

              <div className="space-y-2">
                <Label htmlFor="tags" className="text-foreground font-medium">
                  標籤
                </Label>
                <Input
                  id="tags"
                  placeholder="用逗號分隔標籤，例如：React, TypeScript, 前端"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  className="bg-background/50 border-primary/20 focus:border-primary"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                size="lg"
              >
                <Plus className="mr-2" />
                發布內容
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatePost;
