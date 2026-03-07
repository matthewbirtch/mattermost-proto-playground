import { Routes, Route } from 'react-router-dom'
import AppShell from '@/components/layout/AppShell/AppShell'
import Home from '@/pages/Home/Home'
import ExampleFlow from '@/pages/ExampleFlow/ExampleFlow'

// Register prototype flows here.
// Each entry becomes a sidebar nav item and a route.
export const PROTOTYPES = [
  {
    id: 'example-flow',
    label: 'Example Flow',
    path: '/prototypes/example-flow',
    component: ExampleFlow,
  },
]

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Home />} />
        {PROTOTYPES.map(({ id, path, component: Component }) => (
          <Route key={id} path={path} element={<Component />} />
        ))}
      </Route>
    </Routes>
  )
}
