'use client';

import { LensComments } from '@/components/lens/LensComments';
import { BackButton } from "@/components/ui/back-button";

export default function TestLensCommentsPage() {
  // 使用一个测试 post ID
  const testPostId = "0x01-0x01";

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <BackButton />
        <h1 className="text-2xl font-bold mt-4">Lens 评论系统测试</h1>
        <p className="text-gray-600 mt-2">
          测试新的官方 Lens React hooks 评论功能
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">模拟帖子</h2>
        <p className="text-gray-700">
          这是一个测试帖子，用于验证评论功能是否正常工作。
        </p>
        <div className="text-sm text-gray-500 mt-2">
          Post ID: {testPostId}
        </div>
      </div>

      <LensComments 
        postId={testPostId}
        className="w-full"
      />
    </div>
  );
}