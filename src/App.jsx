import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "layouts/basic";
import AuthLayout from "layouts/auth";
import Loading from "components/progress/loading";
import { useSelector } from "react-redux";

const App = () => {
  const { token } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sessionStorage.getItem('token');
    setLoading(false);
  }, []);

  return (
    <>
      {
        loading ? (
          <Loading />
        ) : (
          // <Routes>
          //   {sessionStorage.getItem('token') != undefined && token != null ? (
          //     <Route path="/*" element={<Layout />} />
          //   ) : (
          //     <Route path="/*" element={<Navigate to="/auth/login" replace />} />
          //   )}
          //   <Route path="auth/*" element={<AuthLayout />} />
          //   <Route path="/*" element={<Layout />} />
          // </Routes>
          
          <Routes>
            {/* {sessionStorage.getItem('token') != undefined && token != null ? (
              <Route path="/*" element={<Layout />} />
            ) : (
              <Route path="/*" element={<Navigate to="/auth/login" replace />} />
            )} */}
            <Route path="/*" element={<Layout />} />
            <Route path="auth/*" element={<AuthLayout />} />
          </Routes>
        )
      }</>
  );
};

export default App;
