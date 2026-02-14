import {create} from 'zustand'

//Creation of the store with zustand
export const useAuthStore = create((set) => ({

    // Creation of a state to stock our user in the localStorage
    userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,

    // When the user logs in, the information are saved in the localStorage and in our state
    setCredentials: (data) => {
        set(() => ({userInfo: data}))
        localStorage.setItem('userInfo', JSON.stringify(data))
    },
    logout: () => {
        set(() => ({userInfo: null}))
        localStorage.removeItem('userInfo')
    }
}))