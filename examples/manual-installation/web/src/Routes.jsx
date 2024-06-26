// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set as RouteSet } from "@redwoodjs/router";

import MainLayout from "./layouts/MainLayout/MainLayout";

const Routes = () => {
  return (
    <Router>
      <RouteSet wrap={MainLayout}>
        <Route path="/" page={ShopPage} name="shop" />
      </RouteSet>

      <Route notfound page={NotFoundPage} />
    </Router>
  );
};

export default Routes;
