import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
// import AuthLayout from "../layouts/Auth";

const keywords = lazy(() => import("../Container/Keywords"));
const groups = lazy(() => import("../Container/Groups"));
const profiles = lazy(() => import("../Container/Profiles"));
const pages = lazy(() => import("../Container/Pages"));
const accounts = lazy(() => import("../Container/Acounts"));
const news = lazy(() => import("../Container/News"));
const forum = lazy(() => import("../Container/Forum"));
const linkedin = lazy(() => import("../Container/Linkedin"));
const editSeed = lazy(() => import("../Container/EditSeed"));
const editArticle = lazy(() => import("../Container/EditArticle"));
const ecommerce = lazy(() => import("../Container/Ecommerce"));

const routes = [
  {
    path: "/keywords",
    component: keywords,
    exact: true,
  },
  {
    path: "/groups",
    component: groups,
    exact: true,
  },
  {
    path: "/profiles",
    component: profiles,
    exact: true,
  },
  {
    path: "/pages",
    component: pages,
    exact: true,
  },
  {
    path: "/accounts",
    component: accounts,
    exact: true,
  },
  {
    path: "/news",
    component: news,
    exact: true,
  },
  {
    path: "/forum",
    component: forum,
    exact: true,
  },
  {
    path: "/linkedin",
    component: linkedin,
    exact: true,
  },
  {
    path: "/ecommerce",
    component: ecommerce,
    exact: true,
  },
  {
    path: "/*/:siteName/edit_seed",
    component: editSeed,
    exact: true,
  },
  {
    path: "/*/:siteName/edit_article",
    component: editArticle,
    exact: true,
  },
];

export default routes;
