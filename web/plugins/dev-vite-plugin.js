module.exports = () => ({
  name: '@redwoodjs-stripe/dev-vite-plugin',
  config() {
    const modules = ['@redwoodjs-stripe/api', '@redwoodjs-stripe/web'];
    return {
      server: {
        watch: {
          ignored: [...modules.map((m) => `!**/node_modules/${m}/**`)],
        },
      },
      build: {
        commonjsOptions: {
          transformMixedEsModules: true,
        },
      },
      optimizeDeps: {
        include: ['rehackt'],
        exclude: modules,
      },
      resolve: {
        conditions: ['redwoodjs-stripe:development'],
      },
    };
  },
});