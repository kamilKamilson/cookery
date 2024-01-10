import { Pill, PillGroup } from "@mantine/core";
import { Prisma } from "@prisma/client";

export const RecipeCategories = ({
  categories,
}: {
  categories: Prisma.RecipeCategoryGetPayload<{
    include: {
      parent: true;
    };
  }>[];
}) => (
  <PillGroup className="mb-4">
    {categories.map((category) => (
      <Pill key={category.id}>
        {category?.parent && `${category.parent.name} - `} {category.name}
      </Pill>
    ))}
  </PillGroup>
);
