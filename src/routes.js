import React from 'react';
import Loadable from 'react-loadable'
import PropertyDetail from './view/components/inspections/propertyDetail/PropertyDetail';
import LoadingComponent from './view/commonComponents/loader/Loading';

function Loading({ pastDelay }) {
    return pastDelay ?
        (<div className="loading-wrapper">
            <LoadingComponent />
        </div>)
        : null;
}

const Dashboard = Loadable({
    loader: () => import('./view/components/dashboard/Dashboard'),
    loading: Loading,
    delay: 200 // in ms
});

const Clients = Loadable({
    loader: () => import('./view/components/clients/Clients'),
    loading: Loading,
    delay: 200 // in ms
});

const ManageData = Loadable({
    loader: () => import('./view/components/manageData/ManageData'),
    loading: Loading,
    delay: 200 // in ms
});

const Inspections = Loadable({
    loader: () => import('./view/components/inspections/Inspections'),
    loading: Loading,
    delay: 200 // in ms
});

const Settings = Loadable({
    loader: () => import('./view/components/settings/Settings'),
    loading: Loading,
    delay: 200 // in ms
});

// const PageNotFound = Loadable({
//     loader: () => import('./pages/pageNotFound/PageNotFound'),
//     loading: Loading,
//     delay: 200 // in ms
// });

const routes = [
    // { path: '/', exact: true, name: 'Home', component: MainContainer },
    { path: '/main', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/clients', name: 'Clients', component: Clients },
    { path: '/inspections', name: 'Inspections', strict: true, component: Inspections },
    { path: '/manage-data', name: 'Commmunities', component: ManageData },
    { path: '/settings', name: 'Settings', component: Settings },
    { path: '/property-detail', name: 'Property Details', component: PropertyDetail },
    // { path: '/property-detail', name: 'Property Details', component: PropertyDetail }
    // { path: "*", name: 'AddStudent', component: PageNotFound },
];

export default routes;
