//Import des librairies
import axios from "axios";
import {create} from "zustand";

//On configure axios pour qu'il accepte les "credentials"
axios.defaults.withCredentials = true

//On crée notre store
    //use nous permet (par react) de créer un hook
    //create() = methode de zustand
export const useUserStore = create((set) => ({
    //Déclaration et initialisation des stats du store
    user: null, //Utilisé pour stocker les données utilisateur qui vienne du backend
    message: "", //Utilisé pour afficher les messages d'erreur ou de succès
    userLoading: false, //Utilisé pour activer ou désactiver un loader

    login: async(data) => {
        set((state) => ({userLoading: !state.userLoading}))
        const response = await axios.post('http://localhost:8000/api/user/login', data)
        set(() => ({user: response.data}))
        set((state) => ({userLoading: !state.userLoading}))
    },

    userLogout: async(data) => {
        set((state) => ({userLoading: !state.userLoading}))
        const response = await axios.post('http://localhost:8000/api/user/logout', data)
        set(() => ({user: response.data}))
        set((state) => ({userLoading: !state.userLoading}))
    },

    //Pour enregister un utilisateur en backend
    //data vient du formulaire
    register: async (data) => {
        //On inverse
        set((state) => ({userLoading: !state.userLoading})) //1. J'initialise mon loader | quand le user confirme sont register -> ça passe à true
        const response = await axios.post('http://localhost:8000/api/user/register', data) //2. J'appelle mon serveur sur la bonne route en passant les données //axios.post car notre route et en post et on met notre route + ce que l'on veut envoyer -> data
        set(() => ({user: response.data})) //3. Je stock les données de l'utilisateur qui viennent du backend dans mon state "user"
        set((state) => ({userLoading: !state.userLoading})) //4. J'arrête mon loader | quand le front à reçu les infos du back -> ça repasse à false
    },

    updateUser: async (data) => {
        set((state) => ({userLoading: !state.userLoading}))
        const response = await axios.put('http://localhost:8000/api/user/profile', data)
        set(() => ({user: response.data}))
        set((state) => ({userLoading: !state.userLoading}))
    }


}))