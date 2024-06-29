import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./api/src/schemas/*.sdl.ts",
  documents: ["./web/src/**/*.ts", "./web/src/**/*.tsx"],
  emitLegacyCommonJSImports: false,
  generates: {
    "./web/src/generated/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default config;
