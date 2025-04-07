const state = {
    msg: '', // 訊息
    visible: false, // 是否顯示snackbar
    showClose: false, // 是否顯示關閉按鈕
    timeout: 2000, // 顯示後的自動關閉時間
    color: 'pink', // 關閉按鈕的顏色
    bgColor: '' // 底色
};
const getters = {
};

const mutations = {
    open_snackbar(state, options) {
        state.visible = true;
        state.msg = options.msg;
        state.bgColor = options.bgColor;
    },
    close_snackbar(state) {
        state.visible = false;
    },
    setColor(state, color) {
        state.color = color;
    },
    setShowClose(state, isShow) {
        state.showClose = isShow;
    },
    setTimeout(state, timeout) {
        state.timeout = timeout;
    },
};

const actions = {
    open_snackbar({ commit }, payload) {
        let timeout = state.timeout;

        commit('open_snackbar', {
            msg: payload.msg,
            bgColor: payload.color,
        });

        setTimeout(() => {
            commit('close_snackbar');
        }, timeout);
    }

};
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};