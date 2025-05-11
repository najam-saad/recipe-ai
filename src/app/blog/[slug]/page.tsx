import { notFound } from 'next/navigation';
import { blogPosts } from '@/content/blogPosts';
import type { BlogPost } from '@/types';
import dynamic from 'next/dynamic';

// Use dynamic import to load the client component
const DynamicBlogPostDisplay = dynamic(() => import('./BlogPostDisplay'), {
  ssr: true,
});

// This function can be used by Next.js to generate static paths at build time
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Using dynamic import with ssr:true creates a proper client/server boundary
  return <DynamicBlogPostDisplay post={post} />;
}
