import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/components/Home'
import { History } from './pages/components/History'
import { DefaultLayout } from './layouts/DefaultLayout'

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/history" element={<History />} />
            </Route>
        </Routes>
    )
}