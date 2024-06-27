import type { DocumentNode } from "graphql";

export const getFragmentName = (document: DocumentNode) => {
  const firstDefinition = document.definitions[0];

  if (firstDefinition.kind !== "FragmentDefinition") {
    throw new Error(
      "Expected the first definition of document to be a named fragment definition",
    );
  }

  return firstDefinition.name.value;
};
