import React from 'react';
const Databases = React.lazy(() => import( './my-pages/databases/databases'));
const AllMetrics = React.lazy(() => import( './my-pages/all-metrics/all-metrics'));
const DatabaseMetrics = React.lazy(() => import( './my-pages/database-metrics/database-metrics'));
const FirstStep = React.lazy(() => import( './my-pages/stepper/first-step/first-step'));
const SecondStep = React.lazy(() => import( './my-pages/stepper/second-step/second-step'));
const ThirdStep = React.lazy(() => import( './my-pages/stepper/third-step/third-step'));
const MetricSelection = React.lazy(() => import( './my-pages/panel-creation/metrics-selection/metrics-selection'));
const VisualizationSettings = React.lazy(() => import( './my-pages/panel-creation/visualization-settings/visualization-settings'));
const Dashboards = React.lazy(() => import( './my-pages/dashboards/dashboards'));
const DatabaseDashboard = React.lazy(() => import( './my-pages/database-dashboard/database-dashboard'));
const DatabasePanels = React.lazy(() => import( './my-pages/database-panels/database-panels'));
const DatabaseDashboards = React.lazy(() => import( './my-pages/database-dashboards/database-dashboards'));
const DatabaseCreation= React.lazy(() => import(  './my-pages/database-creation/database-creation'));
const AllPanels= React.lazy(() => import(  './my-pages/all-panels/all-panels'));
const DashboardCreation = React.lazy(() => import( './my-pages/dashboard-creation/dashboard-creation'));
//
const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables'));
const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/home', exact: true, name: 'Home' },
  { path: '/my-dashboards', exact: true, name: 'Dashboards', component: Dashboards },
  { path: '/my-panels', exact: true, name: 'Panels', component: AllPanels },
  { path: '/databases', exact: true, name: 'Databases', component: Databases },

  { path: '/databases/creation', exact: true, name: 'Database Creation', component: DatabaseCreation },
  { path: '/databases/:dbId', exact: true, name: 'Database Dashboard', component: DatabaseDashboard },
  { path: '/databases/:dbId/metrics', exact: true, name: 'Metrics', component: DatabaseMetrics },
  { path: '/databases/:dbId/metrics/first-step', exact: true, name: 'First Step', component: FirstStep },
  { path: '/databases/:dbId/metrics/first-step/:tableId/second-step', exact: true, name: 'Second Step', component: SecondStep },
  { path: '/databases/:dbId/metrics/first-step/:tableId/second-step/third-step', exact: true, name: 'Third Step', component: ThirdStep },

  //
  { path: '/databases/:dbId/panels', exact: true, name: 'Database Panels', component: DatabasePanels },
  { path: '/databases/:dbId/panels/creation/metric-selection', exact: true, name: 'Metric Selection', component: MetricSelection },
  { path: '/databases/:dbId/panels/creation/metric-selection/visualization-settings', exact: true, name: 'Settings', component: VisualizationSettings },
  { path: '/databases/:dbId/panels/edit/:panelId/metric-selection', exact: true, name: 'Metric Selection [Edit]', component: MetricSelection },
  { path: '/databases/:dbId/panels/edit/:panelId/metric-selection/visualization-settings', exact: true, name: 'Settings [Edit]', component: VisualizationSettings },
 
  { path: '/databases/:dbId/dashboards', exact: true, name: 'Database Dashboards', component: DatabaseDashboards },
  { path: '/databases/:dbId/dashboards/create', exact: true, name: 'Dashboard Creation', component: DashboardCreation },
  { path: '/databases/:dbId/dashboards/:dashboardId/edit', exact: true, name: 'Dashboard Edit', component: DashboardCreation },
  { path: '/all-metrics', exact: true, name: 'All Metrics', component: AllMetrics },
  
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/buttonsT/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
