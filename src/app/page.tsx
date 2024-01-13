import { getCategories } from "@/actions/recipes/categories";
import { Button } from "@/components/atoms/Button";
import {
  Center,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  Stack,
  Text,
} from "@mantine/core";
import { CategoryMenu } from "./components/CategoryMenu";

const classes = {
  wrapper: "container mx-auto px-4 pt-10",
  categories: "flex-wrap flex gap-4 justify-center items-center flex-1",
};

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className={classes.wrapper}>
      <Center>
        <Stack>
          <Text ta={"center"}>Wybierz kategorię przepisów</Text>
          <div className={classes.categories}>
            {categories.map((category) => (
              <CategoryMenu category={category} key={category.id} />
            ))}
          </div>
        </Stack>
      </Center>
    </div>
  );
}
