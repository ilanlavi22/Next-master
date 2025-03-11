"use server";

import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
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
  revalidatePath("/");
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

export const getSinglePost = cache(async (slug: string) => {
  const post = await prisma.blogPost.findUnique({
    where: { id: slug },
  });
  if (!post) notFound();
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
