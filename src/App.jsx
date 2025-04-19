import { ThemeProvider } from "@/components/theme-provider.jsx";
import { Outlet } from "react-router-dom";
import Header from "./components/custom-ui/Header";
import Footer from "./components/custom-ui/Footer";

function App() {

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <Header />
    <Outlet />
    <Footer />
    </ThemeProvider>
  );
}

export default App;