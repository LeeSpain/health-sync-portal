
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Appointments from "./pages/dashboard/Appointments";
import NewAppointment from "./pages/dashboard/NewAppointment";
import Clients from "./pages/dashboard/Clients";
import AddClient from "./pages/dashboard/AddClient";
import ClientDetails from "./pages/dashboard/ClientDetails";
import Finance from "./pages/dashboard/Finance";
import Messages from "./pages/dashboard/Messages";
import Documents from "./pages/dashboard/Documents";
import Settings from "./pages/dashboard/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/appointments" element={<Appointments />} />
          <Route path="/dashboard/appointments/new" element={<NewAppointment />} />
          <Route path="/dashboard/clients" element={<Clients />} />
          <Route path="/dashboard/clients/add" element={<AddClient />} />
          <Route path="/dashboard/clients/:id" element={<ClientDetails />} />
          <Route path="/dashboard/finance" element={<Finance />} />
          <Route path="/dashboard/messages" element={<Messages />} />
          <Route path="/dashboard/documents" element={<Documents />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
