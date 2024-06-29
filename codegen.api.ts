import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./api/src/schemas/*.sdl.ts",
  emitLegacyCommonJSImports: false,
  generates: {
    "./api/src/generated/": {
      preset: "graphql-modules",
    },
  },
};

export default config;
