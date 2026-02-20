import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Tracker from "./pages/Tracker";
import Companies from "./pages/Companies";
import Stats from "./pages/Stats";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/stats" element={<Stats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}