"use client";

import { ActionIcon } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconSearch } from "@tabler/icons-react";

export const SearchBar = () => {
  const onClick = () =>
    modals.openContextModal({
      modal: "searchModal",
      title: "Wyszukiwanie",
      innerProps: {},
    });

  return (
    <ActionIcon onClick={onClick} h={36} w={36} className="bg-beige-dark">
      <IconSearch />
    </ActionIcon>
  );
};
