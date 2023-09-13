const AuthWrapper = () => {
  const location = useLocation();
  const token = !!JSON.parse(localStorage.getItem("token"));

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

//   https://stackoverflow.com/questions/70704613/react-router-dom-navigate-method-is-not-working-properly
