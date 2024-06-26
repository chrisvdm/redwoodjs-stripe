module.exports = () => ({
  name: "@redwoodjs-stripe/dev-vite-plugin",
  config() {
    const modules = ["@redwoodjs-stripe/api", "@redwoodjs-stripe/web"];
    return {
      server: {
        watch: {
          ignored: modules.map((m) => `!**/node_modules/${m}/**`),
        },
      },
      build: {
        commonjsOptions: {
          transformMixedEsModules: true,
        },
      },
      optimizeDeps: {
        // rehackt seems to be commonjs only, and since @apollo/client has it as a
        // dependency + @redwoodjs-stripe/web has @apollo/client as a peer dependency,
        // we end up needing to include it here
        include: ["rehackt"],
        exclude: modules,
      },
      resolve: {
        conditions: ["redwoodjs-stripe:development"],
      },
    };
  },
});
