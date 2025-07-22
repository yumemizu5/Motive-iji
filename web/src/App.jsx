import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";   // ★追加

function Dashboard() {
  return <h2 style={{ textAlign: "center", marginTop: "4rem" }}>Dashboard</h2>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />

        {/* ★保護ルートでラップ */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* どれにも当たらなければ /login へ */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
