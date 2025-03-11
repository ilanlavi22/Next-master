"use client";

import { Button } from "@/components/ui/button";
import { deletePost } from "@/lib/actions";

interface Props {
  id: string;
  children: React.ReactNode;
}

export default function DeletePostButton({ id, children }: Props) {
  return (
    <Button onClick={() => deletePost(id)} className="cursor-pointer text-xs">
      {children}
    </Button>
  );
}
