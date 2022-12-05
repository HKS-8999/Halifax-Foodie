import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import AuthQuestions from "./AuthQuestions";
import Cypher from "./CypherAuth";
import Welcome from "./Welcome";

//Define routes
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth-questions" element={<AuthQuestions />} />
        <Route path="/cypher-auth" element={<Cypher />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
