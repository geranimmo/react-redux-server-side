import HomeComponent from './components/Home';
import DetailComponent from './components/Detail';

const Routes = [
    {
        path: '/',
        exact: true,
        component: HomeComponent
    }, {
        path: '/reward/:id/:title_split',
        component: DetailComponent
    }
];

export default Routes;