import { Routes, Route } from "react-router-dom";
import { Layout } from "@/widgets/Layout/Layout";
import { Dashboard } from "@/pages/Dashboard/Dashboard";
import { Analytics } from "@/pages/Analytics/Analytics";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
    </Routes>
  );
}

export default App;