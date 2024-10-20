import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import Home from "./views/Home";
import Registros from "./views/registros";
import TerminosCondiciones from "./views/TerminosCondiciones";
import NoMatch from "./views/NoMatch";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registros" element={<Registros />} />
          <Route
            path="/terminoscondiciones"
            element={<TerminosCondiciones />}
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
