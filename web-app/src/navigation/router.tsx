import React, { ReactNode } from "react"
import { createBrowserRouter, Navigate, redirect, RouteObject } from "react-router-dom"
import { routeUrls } from "./routeUrls"
import useAuth from "../utils/auth"

import ScreenLogin from "../pages/unprotected/login/login"
import ScreenTermsAndConditions from "../pages/unprotected/terms-and-conditions/terms-and-conditions"
import ScreenPrivacyPolicy from "../pages/unprotected/privacy-policy/privacy-policy"
import ScreenForgotPassword from "../pages/unprotected/forgotPassword/forgotPassword"
import ScreenResetPassword from "../pages/unprotected/resetPassword/resetPassword"
import ScreenTwoFactorAuthentication from "../pages/unprotected/twoFactorAuthentication/twoFactorAuthentication"
import ScreenAccountSetup from "../pages/unprotected/accountSetup/accountSetup"

import ScreenChangePassword from "../pages/changePassword/changePassword"
import ScreenOverview from "../pages/dashboard/overview"
import ScreenAdminDetailVehicle from "../pages/admin-details/vehicle/vehicle"
import ScreenAdminDetailUser from "../pages/admin-details/user/user"
import ScreenFourZeroFour from "../pages/unprotected/fourZeroFour/fourZeroFour"
import { APP_CONFIG } from "../constants/constants"
import DashboardWrapper from "../components/dashboard"
import DashboardAdminWrapper from "../components/dashboardAdmin"
import ScreenDashboardAdminUsers from "../pages/admins/users/users"
import ScreenDashboardAdminVehicles from "../pages/admins/vehicles/vehicles"

const UnProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { isUserLoggedIn } = useAuth();
  const isLoggedIn = isUserLoggedIn()
  if(APP_CONFIG.DEBUG.ALL) console.log("[UnProtectedRoute] check isUserLoggedIn", isLoggedIn)
  if (!isLoggedIn) {
    return element
  } else {
    if(APP_CONFIG.DEBUG.ALL) console.log('[UnProtectedRoute] redirect to dashboard')
    return <Navigate to={routeUrls.dashboard} />
  }
}

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { isUserLoggedIn } = useAuth();
  const isLoggedIn = isUserLoggedIn()
  if(APP_CONFIG.DEBUG.ALL) console.log("[ProtectedRoute] check isUserLoggedIn", isLoggedIn)
  if (isLoggedIn) {
    return element
  } else {
    return <ScreenLogin showSessionExpiredMessage={true} />
  }
}

const TemporaryRoute = () => {
  return (
    <p className={`py-24 text-3xl font-bold text-center text-gray-300 ${APP_CONFIG.DES.DASH.P_HORIZ}`}>This page is under development</p>
  )
}

const routes: RouteObject[] = [
  // --------------------------
  // --- Unprotected routes ---
  // --------------------------
  {
    path: routeUrls.landingPage,
    element: <UnProtectedRoute element={<ScreenLogin />} />
  },
  {
    path: routeUrls.loginPage,
    element: <UnProtectedRoute element={<ScreenLogin />} />
  },
  {
    path: routeUrls.forgotPassword,
    element: <UnProtectedRoute element={<ScreenForgotPassword />} />
  },
  {
    path: routeUrls.resetPassword,
    element: <UnProtectedRoute element={<ScreenResetPassword />} />
  },
  {
    path: routeUrls.termsAndConditions,
    element: <UnProtectedRoute element={<ScreenTermsAndConditions />} />
  },
  {
    path: routeUrls.privacyPolicy,
    element: <UnProtectedRoute element={<ScreenPrivacyPolicy />} />
  },
  {
    path: routeUrls.twoFactorAuthentication,
    element: <UnProtectedRoute element={<ScreenTwoFactorAuthentication />} />
  },
  {
    path: routeUrls.organizationInvitation,
    element: <UnProtectedRoute element={<ScreenAccountSetup />} />
  },

  // --------------------------
  // ---- Protected routes ----
  // --------------------------
  {
    path: routeUrls.changePassword,
    element: <ProtectedRoute element={<ScreenChangePassword />} />
  },
  {
    path: routeUrls.dashboard,
    element: <ProtectedRoute element={<DashboardWrapper />} />,
    children: [
      {
        path: routeUrls.dashboard,
        element: <Navigate to={routeUrls.dashboardChildren.overview} />,
      },
      {
        path: routeUrls.dashboardChildren.overview,
        element: <ScreenOverview />
      },
      {
        path: routeUrls.dashboardChildren.map_overview,
        element: <TemporaryRoute />
      },
      {
        path: routeUrls.dashboardChildren.reports,
        element: <TemporaryRoute />
      },
      {
        path: routeUrls.dashboardChildren.manage_roles,
        element: <TemporaryRoute />
      },
      {
        path: routeUrls.dashboardChildren.maintenance_admin,
        element: <TemporaryRoute />
      },
      {
        path: routeUrls.dashboardChildren.group_admin,
        element: <TemporaryRoute />
      },
      {
        path: routeUrls.dashboardChildren.admins,
        element: <DashboardAdminWrapper />,
        children: [
          {
            path: routeUrls.dashboardChildren.admins,
            element: <Navigate to={routeUrls.dashboardChildren.adminChildren.users} />,
          },
          {
            path: routeUrls.dashboardChildren.adminChildren.users,
            element: <ScreenDashboardAdminUsers />
          },
          {
            path: routeUrls.dashboardChildren.adminChildren.users + "/:userId",
            element: <ScreenAdminDetailUser />
          },
          {
            path: routeUrls.dashboardChildren.adminChildren.roles,
            element: <TemporaryRoute />
          },
          {
            path: routeUrls.dashboardChildren.adminChildren.vehicles,
            element: <ScreenDashboardAdminVehicles />
          },
          {
            path: routeUrls.dashboardChildren.adminChildren.vehicles + "/:vehicleId",
            element: <ScreenAdminDetailVehicle />
          },
          {
            path: routeUrls.dashboardChildren.adminChildren.groups,
            element: <TemporaryRoute />
          },
          {
            path: routeUrls.dashboardChildren.adminChildren.fleettags,
            element: <TemporaryRoute />
          },
          {
            path: routeUrls.dashboardChildren.adminChildren.drivers,
            element: <TemporaryRoute />
          },
          {
            path: routeUrls.dashboardChildren.adminChildren.geozones,
            element: <TemporaryRoute />
          }
        ]
      },
      {
        path: routeUrls.dashboardChildren.manage_rule_alert,
        element: <TemporaryRoute />
      },
      {
        path: routeUrls.dashboardChildren.camera_admin,
        element: <TemporaryRoute />
      }
    ]
  },
  {
    path: "*",
    element: <ScreenFourZeroFour />
  }
]

const router = createBrowserRouter(routes)

export default router
