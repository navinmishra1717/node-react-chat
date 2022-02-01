import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "../routes/public";
import NotFoundComponent from "../containers/NotFoundComponent";

const switchRoutes = (
  <Routes>
    {routes.map((prop) => (
      <Route key={prop.path} path={prop.path} element={<prop.element />} /> // key is to make unique for every routes
    ))}
    <Route path="*" element={<NotFoundComponent />} />
  </Routes>
);

const PublicLayout = () => <div>{switchRoutes}</div>;

export default PublicLayout;
