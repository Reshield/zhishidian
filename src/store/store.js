import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const state = {
    isLogin: false,
    // session: null,
    user: null,
    questions: null,
    questionClass: null,
    answerArray: [],
    tkAnswer: [],
    wrongs: null,
    share: null,
    comments: null,
}
const mutations = {
    //保存登录状态
    userStatus(state, flag) {
        state.isLogin = flag
    },
    // userSession(state, user) {
    //     state.session = user
    // },
    questions(state, questions) {
        state.questions = questions
    },
    questionClass(state, questionClass) {
        state.questionClass = questionClass
    },
    pushAnswer(state, answer) {
        let page = answer.page
        if (state.answerArray[page] == undefined) {
            state.answerArray.push(answer)
        } else {
            state.answerArray[page] = answer
        }
    },
    setTkAnswer(state, answer) {
        let page = String(answer.page)
        let answerId = String(answer.id)
        answer.label = page + answerId
        let have = false
        let index = null
        if (state.tkAnswer.length == 0) {
            state.tkAnswer.push(answer)
        } else {
            for (let i in state.tkAnswer) {
                if (state.tkAnswer[i].label == answer.label) {
                    have = true
                    index = i
                }
                //不写else是为了不往下运行
            }
            if (have == true) {
                state.tkAnswer[index] = answer
            } else {
                state.tkAnswer.push(answer)
            }
        }
    },
    clearAnswerArray(state) {
        state.answerArray = []
    },
    wrongs(state, wrongs) {
        state.wrongs = wrongs
    },
    share(state, share) {
        state.share = share
    },
    comments(state, comments) {
        state.comments = comments
    },
    pushComment(state, comment) {
        state.comments.push(comment)
        console.log(state.comments)
    }
}
const getters = {
    isLogin(state) {
        return state.isLogin
    },
    // session(state) {
    //     return state.user
    // },
    questions(state) {
        return state.questions
    },
    questionClass(state) {
        return state.questionClass
    },
    answer(state) {
        return state.answerArray
    },
    tkAnswer(state) {
        return state.tkAnswer
    },
    wrongs(state) {
        return state.wrongs
    },
    share(state) {
        return state.share
    },
    comments(state) {
        return state.comments
    }
}
const actions = {
    //获取登录状态
    setUser({ commit }, flag) {
        commit("userStatus", flag)
    },
    // 保存 session 数据
    // setSession({ commit }, user) {
    //     commit("userSession", user)
    // },
    setQuestion({ commit }, questions) {
        commit("questions", questions)
    },
    setClass({ commit }, questionClass) {
        commit("questionClass", questionClass)
    },
    setAnswer({ commit }, answer) {
        commit("pushAnswer", answer)
    },
    setTkAnswer({ commit }, answer) {
        commit("setTkAnswer", answer)
    },
    setWrongs({ commit }, wrongs) {
        commit("wrongs", wrongs)
    },
    clearAnswer({ commit }) {
        commit("clearAnswerArray")
    },
    setShare({ commit }, share) {
        commit("share", share)
    },
    setComments({ commit }, comments) {
        commit("comments", comments)
    },
    pushComment({ commit }, comment) {
        commit("pushComment", comment)
    }
}


export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})