"use client";

import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/content/blogPosts';
import type { BlogPost } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, ArrowRight } from 'lucide-react';

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} passHref>
      <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
        {post.image && (
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              data-ai-hint="article illustration"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-xl lg:text-2xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <CalendarDays className="w-3.5 h-3.5 mr-1.5" />
            <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            {post.author && <span className="mx-1.5">•</span>}
            {post.author && <span>By {post.author}</span>}
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription className="mb-3 line-clamp-3">{post.excerpt}</CardDescription>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          )}
        </CardContent>
        <div className="p-6 pt-0">
            <div className="text-sm text-primary group-hover:underline flex items-center">
                Read More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
      </Card>
    </Link>
  );
}


export default function BlogListPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="text-center py-10 md:py-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">RecipeSage Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Tips, tricks, recipes, and stories from our kitchen to yours.
        </p>
      </header>

      {blogPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg py-12">
          No blog posts yet. Check back soon!
        </p>
      )}
    </div>
  );
}
