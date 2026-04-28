import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'
import Header from '#/layouts/Header'
import Sidebar from '#/layouts/Sidebar'
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
              <Header/>
              <div className='flex flex-1 overflow-hidden max-w-screen-xl mx-auto w-full'>
                <Sidebar/>
                <main className='flex-1 overflow-auto p-4'>
                  <Outlet />
                </main>
              </div>


            

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
