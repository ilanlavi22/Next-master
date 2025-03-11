import PostCard from "@/components/PostCard";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

async function getPostById(userId: string) {
  const data = await prisma.blogPost.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function DashBoard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getPostById(user?.id);

  if (!data) {
    return <p>no data</p>;
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-medium">Your Blog Articles</h2>

        <Link className={buttonVariants()} href="/dashboard/create">
          Create Post
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((post) => (
          <PostCard key={post.id} data={post} />
        ))}
      </div>
    </div>
  );
}
