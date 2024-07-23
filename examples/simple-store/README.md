# How create a simple store with the Redwoodjs-stripe plugin
1. Create a redwoodjs app
```js
  yarn  create  redwood-app  simple-store
```
2. Install plugin. Have your Stripe API keys near

```js
  npx @redwoodjs-stripe/cli@latest  setup
  yarn  install
```
3. Change the exported `Routes` function in the `web/src/Routes.jsx` file to:
```js
const  Routes  = () => {
  return (
    <Router>
      <Route  path="/"  page={HomePage}  name="home"  prerender/>
      <Route  notfound  page={NotFoundPage}  />
    </Router>
  )
}
```
4.
