import { Routes, Route } from 'react-router-dom'
import { PATHS } from './paths'
import { Layout }        from '../components/layout/Layout'
import HomePage          from '../components/home/HomePage'
import AnalysisPage      from '../components/analysis/AnalysisPage'
import RemotePage        from '../components/remote/RemotePage'
import SummaryPage       from '../components/summary/SummaryPage'
import AlertsPage        from '../components/alerts/AlertsPage'
import AccessibilityPage from '../components/accessibility/AccessibilityPage'
import AuthorPage        from '../components/author/AuthorPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<Layout />}>
        <Route index                           element={<HomePage />} />
        <Route path={PATHS.ANALYSIS}      element={<AnalysisPage />} />
        <Route path={PATHS.REMOTE}        element={<RemotePage />} />
        <Route path={PATHS.SUMMARY}       element={<SummaryPage />} />
        <Route path={PATHS.ALERTS}        element={<AlertsPage />} />
        <Route path={PATHS.ACCESSIBILITY} element={<AccessibilityPage />} />
        <Route path={PATHS.AUTHOR}        element={<AuthorPage />} />
      </Route>
    </Routes>
  )
}
