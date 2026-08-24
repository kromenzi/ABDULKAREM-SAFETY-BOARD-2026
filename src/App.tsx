import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { queryClient } from "./lib/queryClient";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminAIEngine from "@/pages/admin/ai-engine";
import { DataProvider, useData } from "@/lib/data-context";
import { AdminLayout } from "@/components/layouts/admin-layout";
import PublicReport from "@/pages/public-report";
import { useEffect } from "react";

// Existing pages/routes are preserved through the feature modules already present.
// This lightweight route layer adds the new Local AI Engineering page without
// changing the existing authentication model.

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated } = useData();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) setLocation("/admin/login");
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) return null;
  return (
    <AdminLayout>
      <Component />
    </AdminLayout>
  );
}

function AdminRedirect() {
  const { isAuthenticated } = useData();
  const [, setLocation] = useLocation();
  useEffect(() => {
    setLocation(isAuthenticated ? "/admin/dashboard" : "/admin/login");
  }, [isAuthenticated, setLocation]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/report/:id" component={PublicReport} />
      <Route path="/admin" component={AdminRedirect} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard"><ProtectedRoute component={AdminDashboard} /></Route>
      <Route path="/admin/ai-engine"><ProtectedRoute component={AdminAIEngine} /></Route>
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <Router />
        <Toaster richColors position="top-right" />
      </DataProvider>
    </QueryClientProvider>
  );
}
