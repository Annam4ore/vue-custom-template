import axios from 'axios'
import store from '@/store/index.js';
import router from '@/router';


const http = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 30000,
})

//request
http.interceptors.request.use(
    config => {
        const token = store.state.authorization;
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    error => Promise.reject(error)
)

http.interceptors.response.use(
    response => {
        return response
    },
    async error => {
        if (error.response && error.response.status === 401) {
            // 檢查是否有 refresh_token 並嘗試使用它獲取新的 token
            const refreshToken = store.state.refreshToken;
            if (refreshToken) {
                // try {
                //     const res = await axios({
                //         method: 'PUT',
                //         url: '/api/authorizations',
                //         headers: { Authorization: `Bearer ${refreshToken}` }
                //     });
                //     store.commit('SET_TOKEN', { token: res.data.token, refreshToken: refreshToken });
                //     return http(error.config);
                // } catch (err) {
                //     store.dispatch('snackbar/open_snackbar', {
                //         msg: 'Session expired. Please log in again.',
                //         color: 'error'
                //     }, { root: true })
                //     store.commit('CLEAR_TOKEN');
                //     store.commit('CLEAR_USER');
                //     router.push('/login');
                // }
            } else {
                router.push('/login');
                store.commit('CLEAR_TOKEN');
            }
        } else if (error.message.includes('timeout')) {
            store.dispatch('snackbar/open_snackbar', {
                msg: 'Request timed out. Please try again later.',
                color: 'error'
            }, { root: true })
        } else if (error.code === 'ERR_NETWORK') {
            store.dispatch('snackbar/open_snackbar', {
                msg: 'Network error. Please check your internet connection.',
                color: 'error'
            }, { root: true })
        } else {
            store.dispatch('snackbar/open_snackbar', {
                msg: error.message || 'An unknown error occurred.',
                color: 'error'
            }, { root: true })
        }
        return Promise.reject(error);
    }
);

export { http }