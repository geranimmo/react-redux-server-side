import HomeComponent from './components/Home';
import DetailComponent from './components/Detail';
import NotFound from './components/NotFound';

const Routes = [
    {
        path: '/',
        exact: true,
        component: HomeComponent
    }, {
        path: '/detail/:id',
        component: DetailComponent
    }, {
        component: NotFound
    }
];

export default Routes;