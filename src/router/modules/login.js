const Login = () => import('@/views/LoginView.vue')

export default [
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/',
        name: 'rootLogin',
        component: Login,
    },
]