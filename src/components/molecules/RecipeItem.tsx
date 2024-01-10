import { Pill, PillGroup, Text } from "@mantine/core";
import { Prisma } from "@prisma/client";
import Link from "next/link";

type RecipeItemProps = {
  data: Prisma.RecipeGetPayload<{
    include: {
      categories: {
        include: {
          parent: true;
        };
      };
    };
  }>;
};

export const RecipeItem = ({ data }: RecipeItemProps) => (
  <Link className="no-underline" href={`/recipe/${data.slug}`}>
    <div className="border border-gray-200 rounded-md p-4 border-solid">
      <Text className="font-bold text-gray-900">{data.name}</Text>
      <Text className="mb-4 text-sm text-gray-600">{data.macro}</Text>
      <PillGroup className="mb-4">
        {data.categories.map((category) => (
          <Pill key={category.id}>
            {category?.parent && `${category.parent.name} - `} {category.name}
          </Pill>
        ))}
      </PillGroup>
    </div>
  </Link>
);
