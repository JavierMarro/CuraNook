import { Footer } from "@/components/Footer";
import { NavMenu } from "@/components/NavMenu";
import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => {
    const location = useLocation();
    const showNavAndFooter = location.pathname !== "/";

    return (
      <div className="min-h-screen flex flex-col">
        {showNavAndFooter && <NavMenu className="top-2" />}
        <div className="flex-1">
          <Outlet />
        </div>
        {showNavAndFooter && <Footer />}
      </div>
    );
  },
});
