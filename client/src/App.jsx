import React from "react";
import { AppProvider } from "./providers/AppProvider";
import { MainLayout } from "./layouts";

function App() {
  return (
    <AppProvider>
      <MainLayout>
        <div className="container py-12">
          <div className="empty-state">
            <h1 className="heading text-h3-size mb-4">
              Application Shell Ready
            </h1>
            <p className="text-body-size text-muted max-w-md mx-auto">
              The foundational layout architecture, theme management, and
              provider structure have been successfully implemented.
            </p>
          </div>
        </div>
      </MainLayout>
    </AppProvider>
  );
}

export default App;
