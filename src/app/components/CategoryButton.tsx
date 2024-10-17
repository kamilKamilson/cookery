"use client";

import { Button } from "@/components/atoms/Button";
import { Category } from "@prisma/client";
import Link from "next/link";

export const CategoryButton = ({ data }: { data: Category }) => (
  <Link key={data.id} href={`/kategoria/${data.slug}`}>
    <Button>{data.name}</Button>
  </Link>
);
