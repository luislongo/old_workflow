import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./presentation/components/AppLayout";
import { AdicionarEmpreendimento } from "./presentation/pages/Empreendimento/AdicionarEmpreendimento";
import { Dashboard } from "./presentation/pages/Dashboard";
import { Relatorios } from "./presentation/pages/Relatorios";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboards" replace />} />
          <Route path="/dashboards" element={<Dashboard />} />
          <Route path="/empreendimento" element={<AdicionarEmpreendimento />} />
          <Route path="/relatorios" element={<Relatorios />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
