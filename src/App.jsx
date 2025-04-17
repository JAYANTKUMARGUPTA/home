import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReportsPage from "./pages/Reports/ReportsPage";
import DocumentsPage from "./pages/Documents/DocumentsPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import OwnersPage from "./pages/Owners/OwnersPage";
import CommitteePage from "./pages/Committee/CommitteePage";
import UnitTypesPage from "./pages/UnitTypes/UnitTypesPage";
import PropertyPage from "./pages/Property/PropertyPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginPage from "./pages/Login/LoginPage";
// import RegularBudgetPage from "./pages/Budget/RegularBudgetPage";
// import ExceptionalBudgetPage from "./pages/Budget/ExceptionalBudgetPage";
import RegularBudgetPage from "./pages/Budget/RegularBudgetPage";
import ExceptionalBudgetPage from "./pages/Budget/ExceptionalBudgetPage";
// import other pages...

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/property" element={<PropertyPage />} />
        <Route path="/unit-types" element={<UnitTypesPage />} />
        <Route path="/owners" element={<OwnersPage />} />
        <Route path="/committee" element={<CommitteePage />} />
        <Route path="/budget/regular" element={<RegularBudgetPage />} />
        <Route path="/budget/exceptional" element={<ExceptionalBudgetPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
