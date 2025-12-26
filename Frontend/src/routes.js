import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RoleGuard from "./components/RoleGuard";

// Public pages
import ExpoList from "./pages/public/ExpoList";
import ExpoDetails from "./pages/public/ExpoDetails";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminExpos from "./pages/admin/AdminExpos";
import AdminExhibitors from "./pages/admin/AdminExhibitors";

// Exhibitor pages
import ExhibitorDashboard from "./pages/exhibitor/ExhibitorDashboard";
import ExhibitorMyExpos from "./pages/exhibitor/ExhibitorMyExpos";
import ExhibitorRegisterExpo from "./pages/exhibitor/ExhibitorRegisterExpo";
import ExhibitorBooths from "./pages/exhibitor/ExhibitorBooths";

// Attendee pages
import AttendeeDashboard from "./pages/attendee/AttendeeDashboard";
import AttendeeEvents from "./pages/attendee/AttendeeEvents";
import AttendeeRegistrations from "./pages/attendee/AttendeeRegistrations";
import AttendeeBookmarks from "./pages/attendee/AttendeeBookmarks";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<ExpoList />} />
      <Route path="/expos" element={<ExpoList />} />
      <Route path="/expos/:id" element={<ExpoDetails />} />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin/dashboard"
        element={
          <RoleGuard allowedRoles={["admin"]}>
            <AdminDashboard />
          </RoleGuard>
        }
      />
      <Route
        path="/admin/users"
        element={
          <RoleGuard allowedRoles={["admin"]}>
            <AdminUsers />
          </RoleGuard>
        }
      />
      <Route
        path="/admin/expos"
        element={
          <RoleGuard allowedRoles={["admin"]}>
            <AdminExpos />
          </RoleGuard>
        }
      />
      <Route
        path="/admin/exhibitors"
        element={
          <RoleGuard allowedRoles={["admin"]}>
            <AdminExhibitors />
          </RoleGuard>
        }
      />

      {/* ================= EXHIBITOR ================= */}
      <Route
        path="/exhibitor/dashboard"
        element={
          <RoleGuard allowedRoles={["exhibitor"]}>
            <ExhibitorDashboard />
          </RoleGuard>
        }
      />
      <Route
        path="/exhibitor/my-expos"
        element={
          <RoleGuard allowedRoles={["exhibitor"]}>
            <ExhibitorMyExpos />
          </RoleGuard>
        }
      />
      <Route
        path="/exhibitor/register"
        element={
          <RoleGuard allowedRoles={["exhibitor"]}>
            <ExhibitorRegisterExpo />
          </RoleGuard>
        }
      />
      <Route
        path="/exhibitor/booths"
        element={
          <RoleGuard allowedRoles={["exhibitor"]}>
            <ExhibitorBooths />
          </RoleGuard>
        }
      />

      {/* ================= ATTENDEE ================= */}
      <Route
        path="/attendee/dashboard"
        element={
          <RoleGuard allowedRoles={["attendee"]}>
            <AttendeeDashboard />
          </RoleGuard>
        }
      />
      <Route
        path="/attendee/events"
        element={
          <RoleGuard allowedRoles={["attendee"]}>
            <AttendeeEvents />
          </RoleGuard>
        }
      />
      <Route
        path="/attendee/registrations"
        element={
          <RoleGuard allowedRoles={["attendee"]}>
            <AttendeeRegistrations />
          </RoleGuard>
        }
      />
      <Route
        path="/attendee/bookmarks"
        element={
          <RoleGuard allowedRoles={["attendee"]}>
            <AttendeeBookmarks />
          </RoleGuard>
        }
      />

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
};

export default AppRoutes;
