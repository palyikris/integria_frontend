import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ComplaintForm from './ComplaintForm';
import AdminDashboard from './AdminDashboard';
import ClientDashboard from './ClientDashboard';
import Privacy from "./legal/Privacy";
import Terms from "./legal/Terms";
import Compliance from "./legal/Compliance";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/form/:slug" element={<ComplaintForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/portal" element={<ClientDashboard />} />
        <Route path="/legal/privacy" element={<Privacy />} />
        <Route path="/legal/terms" element={<Terms />} />
        <Route path="/legal/compliance" element={<Compliance />} />
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