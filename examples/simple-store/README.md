# How create a simple store with the Redwoodjs-stripe plugin
1. Create a redwoodjs app
```js
  yarn  create  redwood-app  simple-store
```
2. Install plugin. Have your Stripe API keys near. If you don't already have products linked to your Stripe account then you can have dummy products added.

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
4. Set up authentication. For simplicity use [auth0](https://docs.redwoodjs.com/docs/auth/auth0) authentication. Change `web/src/pages/HomePage/HomePage.jsx` to include a sign up and log out button
```js
import { useAuth } from  'src/auth'
...
const  HomePage  = () => {
const [isCartVisible, setCartVisibilty] =  useState(false)
const { isAuthenticated, signUp, logOut} =  useAuth()
...
  <div  className="rws-header__actions">
    {/* Auth0 */}
    {isAuthenticated ? (
      <button  onClick={logOut}>Log out</button>
    ) : (
      <button  onClick={signUp}>Sign up</button>
    )}
    {/* Redirects to Stripe Customer Portal */}
    <StripeCustomerPortalButton  isLoggedIn={isAuthenticated  }  />
    ...
</div>
```
5. Set up the StripeProvider to use user email to get Stripe user.
