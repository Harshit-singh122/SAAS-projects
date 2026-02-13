import React from "react";
import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import Home from "./pages/home.jsx";
import Dashboard from "/Users/harshitsingh/Desktop/SAAS project/frontend/src/pages/Dashboard.jsx";

import AppShell from "./components/AppShell.jsx";
import CreateInvoice from "./pages/CreateInvoice.jsx";
import InvoicePreview from "./components/InvoicePreview.jsx";
import Invoices from "./pages/Invoices.jsx";
import BusinessProfile from "./pages/BusinessProfile.jsx";

const ClerkProtected = ({ children }) => (
  <>
    <SignedIn>{children}</SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  </>
);

const App = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />

        {/* Protected */}
        <Route
          path="/app"
          element={
            <ClerkProtected>
              <AppShell />
            </ClerkProtected>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="invoices" element={<Invoices/>} />
          <Route path="invoice/:new" element={<CreateInvoice/>} />
          <Route path="invoice/:id/preview" element={<InvoicePreview/>} />
          <Route path="invoice/:id/edit" element={<CreateInvoice/>} />
          <Route path="create-invoice" element={<CreateInvoice/>} />
          <Route path="business" element={<BusinessProfile/>} />
          
        </Route>
      </Routes>
    </div>
  );
};

export default App;
