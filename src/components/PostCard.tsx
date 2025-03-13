"use client";
import type { BlogPost } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  data: BlogPost;
  variant?: string;
}

export default function PostCard({ data, variant }: PostCardProps) {
  return (
    <div className="group relative overflow-hidden border-gray-200 transition-all">
      <Link
        href={`blog/${data.id}`}
        className={variant && "pointer-events-none"}
      >
        <div className="mb-6 max-h-[320px] w-full overflow-hidden rounded-tr-md rounded-bl-md">
          {data.imageUrl && (
            <Image
              src={data.imageUrl}
              alt={data.title}
              width={800}
              height={800}
              className="aspect-square object-cover object-center transition-transform duration-300 ease-out group-hover:scale-110"
              priority
            />
          )}
        </div>
        <h3
          className={`${variant ? "line-clamp-none" : "line-clamp-1"} my-2 text-lg font-bold`}
        >
          {data.title}
        </h3>
        <p
          className={`${variant ? "line-clamp-none" : "line-clamp-6"} text-sm text-balance whitespace-pre-line`}
        >
          {data.content}
        </p>

        <div className="my-4 flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <div className="relative size-6 overflow-hidden rounded-full">
              {data.authorImage && (
                <Image
                  src={data?.authorImage}
                  alt={data.authorName ?? ""}
                  fill
                  className="objcet-cover"
                />
              )}
            </div>
            <p className="text-xs font-medium">{data.authorName}</p>
          </div>
          <time className="text-xs font-medium">
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }).format(data.createdAt)}
          </time>
        </div>
      </Link>
    </div>
  );
}
