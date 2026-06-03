import Header from '#/layouts/Header'
import Sidebar from '#/layouts/Sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
  ssr: false
})

function RouteComponent() {
  return <div>
          <Header/>
          <div className='flex flex-1 overflow-hidden max-w-screen-xl mx-auto w-full'>
            <Sidebar/>
            <main className='flex-1 overflow-auto p-4'>
              <Outlet />
            </main>
          </div>
  </div>
}
