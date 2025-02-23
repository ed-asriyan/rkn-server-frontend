import type { Route, RouterOptions } from '@dvcol/svelte-simple-router/models';
import Home from './home.svelte';
import Children from './children/index.svelte';
import Faq from './faq.svelte';
import Instruction from './instruction/index.svelte';

const RouteName = {
    Home: 'Home',
    Children: 'Children',
    Faq: 'Faq',
    Instruction: 'Instruction',
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
];

export const options: RouterOptions<RouteNames> = {
    routes,
    hash: true,
} as const;
