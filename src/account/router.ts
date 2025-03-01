import type { Route, RouterOptions } from '@dvcol/svelte-simple-router/models';
import Home from './home.svelte';
import Children from './children/index.svelte';
import Faq from './faq.svelte';
import Instruction from './instruction/index.svelte';
import AddToHomeScreen from './add-to-home-screen.svelte';

const RouteName = {
    Home: 'Home',
    Children: 'Children',
    Faq: 'Faq',
    Instruction: 'Instruction',
    AddToHomeScreen: 'AddToHomeScreen',
} as const;

type RouteNames = (typeof RouteName)[keyof typeof RouteName];

const routes: Readonly<Route<RouteNames>[]> = [
    {
        name: RouteName.Home,
        path: '/',
        component: Home,
        props: {
            title: RouteName.Home,
        },
    },
    {
        name: RouteName.Children,
        path: '/children',
        component: Children,
        props: {
            title: RouteName.Children,
        },
    },
    {
        name: RouteName.Faq,
        path: '/faq',
        component: Faq,
        props: {
            title: RouteName.Faq,
        },
    },
    {
        name: RouteName.Instruction,
        path: '/instruction',
        component: Instruction,
        props: {
            title: RouteName.Instruction,
        },
    },
    {
        name: RouteName.AddToHomeScreen,
        path: '/add-to-home-screen',
        component: AddToHomeScreen,
        props: {
            title: RouteName.AddToHomeScreen,
        },
    },
];

export const options: RouterOptions<RouteNames> = {
    routes,
    hash: true,
} as const;
