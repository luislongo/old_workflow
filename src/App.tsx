import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./presentation/components/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes></Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
