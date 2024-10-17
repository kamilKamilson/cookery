"use client";

import { Tabs, TabsPanel, TabsTab } from "@mantine/core";
import { IconCategory, IconFile, IconTag } from "@tabler/icons-react";
import { z } from "zod";
import { AddRecipe } from "../forms/AddRecipe";
import { AddCategory } from "../forms/AddCategory";
import { AddTag } from "../forms/AddTag";

export const AddModal = () => {
  return (
    <Tabs defaultValue="recipe">
      <Tabs.List>
        <TabsTab value="recipe" leftSection={<IconFile className="w-5 h-5" />}>
          Przepis
        </TabsTab>
        <TabsTab
          value="category"
          leftSection={<IconCategory className="w-5 h-5" />}
        >
          Kategoria
        </TabsTab>
        <TabsTab value="tag" leftSection={<IconTag className="w-5 h-5" />}>
          Tag
        </TabsTab>
      </Tabs.List>

      <TabsPanel value="recipe">
        <AddRecipe />
      </TabsPanel>

      <TabsPanel value="category">
        <AddCategory />
      </TabsPanel>

      <TabsPanel value="tag">
        <AddTag />
      </TabsPanel>
    </Tabs>
  );
};
