import { AuthenticatedApp } from "./components/AuthenticatedApp";
import { UnauthenticatedApp } from "./components/UnauthenticatedApp";
import { useAuth } from "./hooks/useAuth";
import "./App.css";
import React, { Component }  from 'react';

function App() {
  const { user } = useAuth();

  return (
    <div className="container">
      <h1>| HalifaxFoodie | Food Ordering Application |</h1>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
