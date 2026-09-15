import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./presentation/components/AppLayout";
import { AdicionarEmpreendimento } from "./presentation/pages/Empreendimento/AdicionarEmpreendimento";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/empreendimento" replace />} />
          <Route path="/empreendimento" element={<AdicionarEmpreendimento />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
