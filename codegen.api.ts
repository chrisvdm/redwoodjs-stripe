import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./api/src/schemas/*.sdl.ts",
  emitLegacyCommonJSImports: false,
  generates: {
    "./api/src/generated/graphql.ts": {
      plugins: ["typescript"],
    },
  },
};

export default config;
