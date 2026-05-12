import { Routes, Route } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import HomePage from '../components/home/HomePage'
import AnalysisPage from '../components/analysis/AnalysisPage'
import AnalysisResultPage from '../components/analysis/AnalysisResultPage'
import AdvicePage from '../components/analysis/AdvicePage'
import DailyAdvicePage from '../components/analysis/DailyAdvicePage'
import MonthlyAdvicePage from '../components/analysis/MonthlyAdvicePage'
import RemotePage from '../components/remote/RemotePage'
import RemoteControlPage from '../components/remote/RemoteControlPage'
import RemoteScanPage from '../components/remote/RemoteScanPage'
import SummaryPage from '../components/summary/SummaryPage'
import SummaryDetailPage from '../components/summary/SummaryDetailPage'
import AlertsPage from '../components/alerts/AlertsPage'
import AccessibilityPage from '../components/accessibility/AccessibilityPage'
import AuthorPage from '../components/author/AuthorPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="components/analysis/AnalysisPage" element={<AnalysisPage />} />
        <Route path="analysis/result" element={<AnalysisResultPage />} />
        <Route path="analysis/advice" element={<AdvicePage />} />
        <Route path="analysis/daily-advice" element={<DailyAdvicePage />} />
        <Route path="analysis/monthly-advice" element={<MonthlyAdvicePage />} />
        <Route path="components/remote/RemotePage" element={<RemotePage />} />
        <Route path="components/remote/RemoteControlPage" element={<RemoteControlPage />} />
        <Route path="components/remote/RemoteScanPage" element={<RemoteScanPage />} />
        <Route path="components/summary/SummaryPage" element={<SummaryPage />} />
        <Route path="components/summary/SummaryDetailPage" element={<SummaryDetailPage />} />
        <Route path="components/alerts/AlertsPage" element={<AlertsPage />} />
        <Route path="components/accessibility/AccessibilityPage" element={<AccessibilityPage />} />
        <Route path="components/author/AuthorPage" element={<AuthorPage />} />
      </Route>
    </Routes>
  )
}
