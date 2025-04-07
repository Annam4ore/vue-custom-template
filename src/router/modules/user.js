import DefaultLayout from '@/layout/DefaultLayout.vue';
export default [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {
                path: '/users',
                name: 'users',
                component: () => import('@/views/user/index.vue'),
            },
        ]
    }
]