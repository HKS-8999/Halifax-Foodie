import { AuthenticatedApp } from "./components/AuthenticatedApp";
import { UnauthenticatedApp } from "./components/UnauthenticatedApp";
import { useAuth } from "./hooks/useAuth";
import "./App.css";

function App() {
  const { user } = useAuth();

  return (
    <div className="container">
      <h1>| HalifaxFoodie | Restaurant Dashboard |</h1>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      {/* <AuthenticatedApp/> */}
    </div>
  );
}

export default App;
