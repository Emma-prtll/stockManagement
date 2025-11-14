import {create} from 'zustand'

export const useAuthStore = create((set) => ({ //Création d'un store avec zustand
    //On crée un state pour stocker notre utilisateur dans le localStorage
    userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,

    //Quand l'utilisateur se connecte, on enregistre ses infos dans le localStorage et dans notre state
    setCredentials: (data) => {
        set(() => ({userInfo: data}))
        localStorage.setItem('userInfo', JSON.stringify(data))
    },
    logout: () => {
        set(() => ({userInfo: null}))
        localStorage.removeItem('userInfo')
    }
}))