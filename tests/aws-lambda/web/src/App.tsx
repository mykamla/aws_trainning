import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CoursePage } from './pages/CoursePage'
import { DaySessionPage } from './pages/DaySessionPage'
import { HomePage } from './pages/HomePage'
import { ResultsPage } from './pages/ResultsPage'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/day/:dayId" element={<DaySessionPage />} />
          <Route path="/day/:dayId/results" element={<ResultsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
