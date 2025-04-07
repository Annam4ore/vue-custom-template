const state = {
    logs: []
  };
  
  const mutations = {
    ADD_ERROR_LOG: (state, log) => {
        state.logs.unshift(log);
        if (state.logs.length > 50) state.logs.pop();
      }
  };
  
  const actions = {
    addErrorLog({ commit }, logInfo) {
       console.log('addErrorLog', logInfo);
       commit('ADD_ERROR_LOG', logInfo);
    }
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  };
  