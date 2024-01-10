import { StyledHeader } from "@/components/atoms/StyledHeader";
import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Stack,
  Text,
} from "@mantine/core";
import { AddNew } from "./components/AddNew";
import { getIngredients } from "@/actions/ingredients/ingredients";
import { IngredientItem } from "./components/IngredientItem";

export default async function IngredientsPage() {
  const categories = await getIngredients();

  return (
    <Box>
      <Stack>
        <AddNew />
        <StyledHeader>Składniki</StyledHeader>
        <Accordion variant="separated">
          {categories.map((category) => (
            <AccordionItem value={category.id} key={category.id}>
              <AccordionControl>
                <div className="flex gap-4">
                  <Badge color={category.color} />
                  {category.name}
                </div>
              </AccordionControl>
              <AccordionPanel>
                {category.ingredients.length ? (
                  <div className="flex gap-4 flex-wrap">
                    {category.ingredients.map((ingredient) => (
                      <IngredientItem key={ingredient.id} data={ingredient} />
                    ))}
                  </div>
                ) : (
                  <Text>Nie ma składników w tej kategorii</Text>
                )}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Stack>
    </Box>
  );
}
