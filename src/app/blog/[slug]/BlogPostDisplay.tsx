"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, UserCircle, Tag, ChevronLeft } from 'lucide-react';
import type { BlogPost } from '@/types';

// Helper to render markdown-like content (very basic for now)
const renderContent = (content: string) => {
  // Replace markdown headers with HTML headers and add Tailwind classes
  content = content.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mt-8 mb-4">$1</h2>');
  content = content.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>');
  // Replace markdown bold with strong tag
  content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Replace markdown italic with em tag
  content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Replace markdown lists with ul/li and add Tailwind classes
  content = content.replace(/^\* (.*$)/gim, '<li class="ml-5 list-disc">$1</li>');
  content = content.replace(/^(1\.|[0-9]+\.) (.*$)/gim, '<li class="ml-5 list-decimal">$1 $2</li>');
  // Wrap paragraphs
  content = content.split(/\n\s*\n/).map(paragraph => {
    if (paragraph.startsWith('<h') || paragraph.startsWith('<ul') || paragraph.startsWith('<ol') || paragraph.startsWith('<li')) {
      return paragraph;
    }
    return `<p class="mb-4 leading-relaxed">${paragraph}</p>`;
  }).join('');
  // Basic handling for lists by wrapping consecutive li items (very naive)
  content = content.replace(/(<li.*<\/li>\s*)+/g, (match) => `<ul class="mb-4">${match}</ul>`);

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default function BlogPostDisplay({ post }: { post: BlogPost }) {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/blog" legacyBehavior>
          <Button variant="outline" className="mb-4">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>
      <article className="bg-card p-6 sm:p-10 rounded-xl shadow-xl">
        <header className="mb-8 border-b pb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-primary">{post.title}</h1>
          <div className="flex flex-wrap items-center text-sm text-muted-foreground space-x-4">
            <div className="flex items-center">
              <CalendarDays className="w-4 h-4 mr-1.5" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            {post.author && (
              <div className="flex items-center">
                <UserCircle className="w-4 h-4 mr-1.5" />
                <span>By {post.author}</span>
              </div>
            )}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-muted-foreground mr-1" />
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          )}
        </header>

        {post.image && (
          <div className="relative w-full aspect-[16/9] mb-8 rounded-lg overflow-hidden shadow-md" data-ai-hint="blog post image">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* In a real app, you'd use a proper Markdown renderer like react-markdown */}
          {renderContent(post.content)}
        </div>
      </article>
    </div>
  );
} 