import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define the public routes
const publicRoutes = ["/api/uploadthing"];
const isProtectedRoute = createRouteMatcher(["/(.)*"]);
const isPublicRoute = createRouteMatcher(publicRoutes);

export default clerkMiddleware((auth, request) => {
  // If the route is public, do not apply protection
  if (!isPublicRoute(request)) {  
    if (isProtectedRoute(request)) auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};