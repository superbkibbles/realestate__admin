import routes from "routes";

export const useRouteName = (n) => {
  if (n) return n
  let name = "";
  routes.forEach((route) => {
    if (window.location.href.indexOf(route.layout + route.path) !== -1) {
      name = routes.rtlActive ? route.rtlName : route.name;
    }
  });
  return name;
};
