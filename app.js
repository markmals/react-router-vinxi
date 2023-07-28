import reactRefresh from "@vitejs/plugin-react";
import { createApp } from "vinxi";

export default createApp({
    routers: [
        {
            name: "public",
            mode: "static",
            dir: "./public",
            base: "/"
        },
        {
            name: "client",
            mode: "build",
            handler: "./src/entry.client.tsx",
            build: {
                target: "browser",
                // @ts-ignore
                plugins: () => [reactRefresh()]
            },
            base: "/_build"
        },
        {
            name: "ssr",
            mode: "handler",
            handler: "./src/entry.server.tsx",
            build: {
                target: "node"
            }
        }
    ]
});
