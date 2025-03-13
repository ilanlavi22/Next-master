import PostCard from "@/components/PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/prisma";
import type { BlogPost } from "@prisma/client";
import { Suspense } from "react";

export const revalidate = 7200; // 120 minutes / 2 hours revalidation

async function getPosts() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = await prisma.blogPost.findMany({
    select: {
      title: true,
      content: true,
      imageUrl: true,
      authorImage: true,
      authorName: true,
      id: true,
      createdAt: true,
      authorId: true,
      updatedAt: true,
    },
  });
  return data;
}

export default async function Home() {
  const posts: BlogPost[] = await getPosts();

  return (
    <div className="py-6">
      <h1 className="mb-8 text-2xl font-bold tracking-tight">Latest posts</h1>

      {posts.length === 0 ? (
        <p>No Posts found</p>
      ) : (
        <Suspense fallback={<BlogPostsGrid count={posts.length} />}>
          <BlogPosts />
        </Suspense>
      )}
    </div>
  );
}

async function BlogPosts() {
  const posts: BlogPost[] = await getPosts();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts?.map((post) => <PostCard key={post.id} data={post} />)}
    </div>
  );
}

// Blog posts grid with loading state
function BlogPostsGrid({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/*  get the data or the posts length ? */}
      {Array.from({ length: count }).map((_, index) => (
        <div
          className="bg-card text-card-foreground mb-6 flex w-full flex-col overflow-hidden rounded-tr-md rounded-bl-md border-gray-200"
          key={index}
        >
          {/* Image skeleton */}
          <Skeleton className="h-[370px] w-full rounded-none" />

          <div className="flex flex-1 flex-col gap-3 p-4">
            {/* Title skeleton */}
            <Skeleton className="h-6 w-3/4" />

            {/* Content skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>

            {/* Footer skeleton */}
            <div className="mt-auto flex items-center justify-between pt-4">
              <div className="flex items-center">
                <Skeleton className="mr-2 h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
