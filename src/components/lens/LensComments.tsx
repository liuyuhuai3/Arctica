"use client";

import React, { useState } from "react";
import { useCreateComment, useProfile } from "@lens-protocol/react-web";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";

interface LensCommentsProps {
  postId: string;
  className?: string;
}

export function LensComments({ postId, className = "" }: LensCommentsProps) {
  const [newComment, setNewComment] = useState("");
  
  // 使用官方的 hooks
  const { execute: createComment, loading: creating, error } = useCreateComment();

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      toast.error("请输入评论内容");
      return;
    }

    try {
      const result = await createComment({
        commentOn: postId,
        metadata: {
          content: newComment.trim(),
          locale: "en",
          mainContentFocus: "TEXT_ONLY" as const,
        },
      });

      if (result.isSuccess()) {
        toast.success("评论发送成功！");
        setNewComment("");
      } else {
        toast.error("评论发送失败");
      }
    } catch (err) {
      console.error("Error creating comment:", err);
      toast.error("评论发送失败");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          评论
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Comment Input */}
        <div className="space-y-3">
          <Textarea
            placeholder="写下你的评论..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={handleKeyPress}
            className="min-h-[80px] resize-none"
            disabled={creating}
          />
          <div className="flex justify-end">
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim() || creating}
              className="flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              {creating ? "发送中..." : "发表评论"}
            </Button>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm">
            错误: {error.message}
          </div>
        )}
      </CardContent>
    </Card>
  );
}