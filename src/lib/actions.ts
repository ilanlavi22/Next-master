"use server";

import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cache } from "react";
import { createPostSchema, CreatePostValues } from "./validation";

export async function createPost(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/regsiter");
  }

  const values = Object.fromEntries(formData.entries());
  const { title, content, imageUrl } = createPostSchema.parse(values);

  await prisma.blogPost.create({
    data: {
      title: title.trim(),
      content: content.trim(),
      imageUrl: imageUrl.trim(),
      authorId: user.id,
      authorImage: user.picture as string,
      authorName: user.given_name as string,
    },
  });
  revalidatePath("/"); // clearing the home page cache when posting an article -- for static rendered pages as for dynamic pages its not needed.
  return redirect("/dashboard");
}

export async function validateCreatePost(values: CreatePostValues) {
  const result = createPostSchema.safeParse(values);
  //const result = createPostSchema.safeParse({ title: "john" }); //checking server validation

  if (!result.success) {
    return {
      status: "error",
      message: result.error.message,
    };
  }
  return {
    status: "success",
    message: "all goes",
  };
}

// The React cache function is used to memoize the result of this async function.
// This means if getSinglePost is called multiple times with the same slug parameter,
// it will return the cached result instead of making redundant database queries.
// This helps improve performance by avoiding unnecessary database calls.
export const getSinglePost = cache(async (slug: string) => {
  const post = await prisma.blogPost.findUnique({
    where: { id: slug },
  });
  // if (!post) notFound();
  return post;
});

export const deletePost = async (slug: string) => {
  try {
    await prisma.blogPost.delete({
      where: { id: slug },
    });
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/");
  return redirect("/dashboard");
};
