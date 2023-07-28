/// <reference types="vinxi/client" />
import { createAssets } from "@vinxi/react";
import { AssetsContext, routes } from "./app";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, matchRoutes, RouterProvider } from "react-router-dom";
import "vinxi/runtime/client";
import "./index.css";

hydrate();

async function hydrate() {
    const Assets = createAssets(
        import.meta.env.MANIFEST["client"].handler,
        import.meta.env.MANIFEST["client"]
    );

    // Determine if any of the initial routes are lazy
    let lazyMatches = matchRoutes(routes, window.location)?.filter(m => m.route.lazy);

    // Load the lazy matches and update the routes before creating your router
    // so we can hydrate the SSR-rendered content synchronously
    if (lazyMatches && lazyMatches?.length > 0) {
        await Promise.all(
            lazyMatches.map(async m => {
                let routeModule = await m.route.lazy!();
                Object.assign(m.route, { ...routeModule, lazy: undefined });
            })
        );
    }

    let router = createBrowserRouter(routes);

    ReactDOM.hydrateRoot(
        document,
        <React.StrictMode>
            <AssetsContext.Provider value={<Assets />}>
                <RouterProvider router={router} fallbackElement={null} />
            </AssetsContext.Provider>
        </React.StrictMode>
    );
}
