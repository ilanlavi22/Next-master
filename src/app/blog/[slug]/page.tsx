import DeletePostButton from "@/components/DeletePostButton";
import PostCard from "@/components/PostCard";
import { buttonVariants } from "@/components/ui/button";
import { getSinglePost } from "@/lib/actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

type Params = Promise<{ slug: string }>;

export default async function page({ params }: { params: Params }) {
  const { slug } = await params;
  const postData = await getSinglePost(slug);
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!postData) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="flex flex-col items-center gap-4">
          <p className="text-2xl font-bold">No post found!</p>
          <Link href="/" className={`${buttonVariants({ variant: "link" })}`}>
            Back to posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-4 flex items-center gap-4">
        <Link
          href="/"
          className={`${buttonVariants({ variant: "link" })} text-xs`}
        >
          Back to posts
        </Link>

        {user?.id === postData.authorId && (
          <DeletePostButton id={postData.id}>Delete Post</DeletePostButton>
        )}
      </div>

      <PostCard data={postData} variant={"singlePost"}></PostCard>
    </div>
  );
}
