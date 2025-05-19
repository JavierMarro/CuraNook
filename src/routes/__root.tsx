import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      {/* TODO: Create a Footer component and place it here */}
      {/* TODO: Remember to remove <TanStackRouterDevtools /> */}
      <TanStackRouterDevtools />
    </>
  ),
});
