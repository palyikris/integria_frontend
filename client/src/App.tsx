import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ComplaintForm from './ComplaintForm';
import AdminDashboard from './AdminDashboard';
import ClientDashboard from './ClientDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/form/:slug" element={<ComplaintForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/portal" element={<ClientDashboard />} />
        <Route
          path="*"
          element={
            <div className="flex h-screen items-center justify-center">
              <p className="text-sm text-slate-500">
                Integria Compliance Platform - 2026
              </p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}