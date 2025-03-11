"use client";
import LoadingButton from "@/components/LoadingButton";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPost, validateCreatePost } from "@/lib/actions";
import { createPostSchema, CreatePostValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function CreatePage() {
  const form = useForm<CreatePostValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: "",
      imageUrl: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = form;

  async function onSubmit(values: CreatePostValues) {
    try {
      const data = await validateCreatePost(values);

      if (data.status === "error") {
        console.log(data.message);
      } else {
        console.log(data.message);
      }

      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value as string);
        }
      });
      await createPost(formData);
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
    }
  }

  return (
    <div className="mx-auto my-4 flex max-w-lg flex-col">
      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="Content" {...field} />
                </FormControl>
                <FormMessage>{errors?.content?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image url</FormLabel>
                <FormControl>
                  <Input placeholder="Image url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton loading={isSubmitting}>Submit</LoadingButton>
          {/* <SubmitButton /> */}
        </form>
      </Form>
    </div>
  );
}
