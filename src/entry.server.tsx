import { renderAsset } from "@vinxi/react";
import { renderToPipeableStream } from "react-dom/server";
import { eventHandler } from "vinxi/runtime/server";
import * as React from "react";
import {
    createStaticHandler,
    createStaticRouter,
    StaticRouterProvider
} from "react-router-dom/server";
import { AssetsContext, routes } from "./app";
import { NodeIncomingMessage } from "h3";

export default eventHandler(async event => {
    const clientManifest = import.meta.env.MANIFEST["client"];
    // console.log(clientManifest);
    const assets = await clientManifest.inputs[clientManifest.handler].assets();
    const events = {};

    let { query, dataRoutes } = createStaticHandler(routes);
    let remixRequest = await createFetchRequest(event.node.req);
    let context = await query(remixRequest);

    if (context instanceof Response) {
        throw context;
    }

    let router = createStaticRouter(dataRoutes, context);

    const stream = renderToPipeableStream(
        <React.StrictMode>
            <AssetsContext.Provider value={assets.map(m => renderAsset(m))}>
                <StaticRouterProvider router={router} context={context} nonce="the-nonce" />
            </AssetsContext.Provider>
        </React.StrictMode>,
        {
            onAllReady: () => {
                events["end"]?.();
            },
            bootstrapModules: [clientManifest.inputs[clientManifest.handler].output.path],
            bootstrapScriptContent: `window.manifest = ${JSON.stringify(
                await clientManifest.json()
            )}`
        }
    );

    // @ts-ignore
    stream.on = (event, listener) => {
        events[event] = listener;
    };

    event.node.res.setHeader("Content-Type", "text/html");
    return stream;
});

export async function createFetchRequest(req: NodeIncomingMessage): Promise<Request> {
    // console.log(req.url);
    let url = new URL(`http://localhost:3001${req.url}`);
    // let origin = `${url.protocol}://${url.host}`;
    // // Note: This had to take originalUrl into account for presumably vite's proxying
    // url = new URL(req.url || req.url, origin);

    let controller = new AbortController();
    req.on("close", () => controller.abort());

    let headers = new Headers();

    for (let [key, values] of Object.entries(req.headers)) {
        if (values) {
            if (Array.isArray(values)) {
                for (let value of values) {
                    headers.append(key, value);
                }
            } else {
                headers.set(key, values);
            }
        }
    }

    let init: RequestInit = {
        method: req.method,
        headers,
        signal: controller.signal
    };

    if (req.method !== "GET" && req.method !== "HEAD") {
        init.body = await getBody(req);
    }

    return new Request(url.href, init);
}

async function getBody(req: NodeIncomingMessage): Promise<any> {
    let buffer = "";

    return new Promise(resolve => {
        req.on("data", chunk => {
            buffer += chunk;
        }).on("end", () => {
            resolve(buffer);
        });
    });
}
