# React Router + Vinxi

This is currently a simple example project showing React Router working with [Vinxi](https://github.com/nksaraf/vinxi). The next steps are:

* [ ] Add a custom [FileSystemRouter](https://github.com/nksaraf/vinxi/blob/main/examples/react/spa/tanstack-router-app/app.js#L10-L31) mimicking the [Remix flat routing style](https://remix.run/docs/en/main/file-conventions/route-files-v2)
* [ ] [Convert to Preact using `preact/compat`](https://github.com/jacob-ebey/remix-preact)
* [ ] [`links`](https://remix.run/docs/en/1.19.1/route/links), [`meta`](https://remix.run/docs/en/1.19.1/route/meta-v2), [`headers`](https://remix.run/docs/en/1.19.1/route/headers), [`shouldRevalidate`](https://remix.run/docs/en/1.19.1/route/should-revalidate), [`handle`](https://remix.run/docs/en/1.19.1/route/handle), and [`ErrorBoundary`](https://remix.run/docs/en/1.19.1/route/error-boundary-v2) support per route
* [ ] MDX support, [content collections](https://docs.astro.build/en/guides/content-collections), [data collections](https://astro.build/blog/astro-250/#data-collections-and-references), and [collection querying](https://github.com/withastro/roadmap/discussions/574)
* [ ] [Pre-rendering](https://github.com/remix-run/remix/discussions/2853) and [app shell rendering](https://angular.io/guide/app-shell)
* [ ] Automatically hoist loaders and actions to the server using [Thaler](https://github.com/lxsmnsyc/thaler) or [Bling](https://github.com/tanstack/bling)
* [ ] [Client loaders and actions](https://github.com/remix-run/remix/discussions/4950)
* [ ] [Auth.js](https://authjs.dev/) integration
* [ ] Explore a [FileSystemRouter configuration closer to SvelteKit](https://kit.svelte.dev/docs/routing#page-page-server-js), where server and client code is always located in separate files
* [ ] Convert to Preact using [`remix-router-preact`](https://github.com/brophdawg11/remix-routers/tree/preact/packages/preact)
* [ ] Some sort of [middleware](https://qwik.builder.io/docs/middleware/) ([`beforeLoader`](https://github.com/remix-run/react-router/discussions/9564)?)
