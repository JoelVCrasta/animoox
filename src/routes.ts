/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification",
    "/components",
    "/products",
    "/products-preview",
    "/icons",
    "^/products-preview/.*",
    "/cart",
    "/api/product",
    "/api/cart",
    "/api/cart/bulk"
];

export const publicRoutePatterns = [
    "^/products-preview/.*",  // Matches /products-preview/[productId]
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */

export const authRoutes = [
    "/auth/login",
    "/auth/sign-up",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",    
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/products";

/**
 * An array of routes that are accessible only to admin users
 * These routes require authentication and admin privileges
 * @type {string[]}
 */
export const adminRoutes = [
    "/admin/test",
];
