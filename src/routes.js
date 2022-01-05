/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
// import Unarchive from "@material-ui/icons/Unarchive";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import AddAgency from "views/Agency/AddAgency/AddAgency";
import Agencies from "views/Agency/Agencies";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import ShowAgency from "./views/Agency/ShowAgency/ShowAgency";
import NewProperty from "./views/Property/NewProperty/NewProperty"
import Properties from "./views/Property/Properties";
import EditProperty from "./views/Property/EditProperty/EditProperty";
import EditAgency from "./views/Agency/EditAgency/EditAgency";
import Complexes from "./views/Complexes/Complexes";
import ShowComplex from "./views/Complexes/ShowComplex/ShowComplex";
import AddComplex from "./views/Complexes/AddComplex/AddComplex";
import EditComplex from "./views/Complexes/EditComplex/EditComplex";
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    sideBar: true,
  },
  {
    path: "/agency",
    name: "Agencies",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: Agencies,
    layout: "/admin",
    sideBar: true,
  },
  {
    path: "/agency/newagency",
    name: "Add Agency",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: AddAgency,
    layout: "/admin",
  },
  {
    path: "/agency/show/:agencyId",
    name: "Show properties",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: ShowAgency,
    layout: "/admin",
  },
  {
    path: "/agency/edit/:agencyId",
    name: "Edit properties",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: EditAgency,
    layout: "/admin",
  },
  {
    path: "/property",
    name: "Properties",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: Properties,
    layout: "/admin",
    sideBar: true
  },
  {
    path: "/property/edit/:propertyID",
    name: "Edit property",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: EditProperty,
    layout: "/admin",
  },
  {
    path: "/property/add",
    name: "Add Property",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: NewProperty,
    layout: "/admin",
  },
  {
    path: "/complexes",
    name: "Complexes",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: Complexes,
    layout: "/admin",
    sideBar: true
  },
  {
    path: "/complexes/add",
    name: "Complexes",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: AddComplex,
    layout: "/admin",
  },
  {
    path: "/complexes/edit/:complexId",
    name: "Complexes",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: EditComplex,
    layout: "/admin",
  },
  {
    path: "/complexes/show/:complexId",
    name: "Complex",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: ShowComplex,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin",
    sideBar: true,
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin",
    sideBar: true,
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin",
    sideBar: true,
  },
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "التطور للاحترافية",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin",
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "التطور للاحترافية",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin",
  // },
];

export default dashboardRoutes;
