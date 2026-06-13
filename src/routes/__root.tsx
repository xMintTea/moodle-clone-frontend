import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import appCss from '../styles.css?url'
import { QueryClient } from '@tanstack/react-query'


interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {charSet: "utf-8"},
      {name: "vieport", content: "width=device-width, initial-scale=1"},
      {title: 'TanStack Start Starter'}
    ],
    links: [
      {rel: "stylesheet", href: appCss}
    ]
  }),
  component: RootDocument,
})

function RootDocument() {
  return (
        <html lang="en">
          <head>
            <HeadContent />
          </head>
          <body className='h-screen flex flex-col'>
            <Outlet/>


            <TanStackDevtools
              config={{
                position: 'bottom-right',
              }}
              plugins={[
                {
                  name: 'Tanstack Router',
                  render: <TanStackRouterDevtoolsPanel />,
                },
              ]}
            />
            <Scripts />

          </body>
        </html>
  )
}
