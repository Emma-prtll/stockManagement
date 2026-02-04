//Import des librairies
import axios from "axios"
import {create} from "zustand"

//On configure axios pour qu'il accepte les "credentials"
axios.defaults.withCredentials = true

export const useCarHistoryStore = create((set) => ({
    //Déclaration et initialisation des stats du store
    carsHistory: [], //Utilisé pour stocker les données utilisateur qui vienne du backend
    carHistory: null,
    message: "", //Utilisé pour afficher les messages d'erreur ou de succès
    historyLoading: false,

    getCarsHistorical: async () => {
        set({ historyLoading: true })
        try {
            const response = await axios.get(`http://localhost:8000/api/carHistory/getCarsHistorical`)
            set({
                carsHistory: response.data,
                historyLoading: false,
            })

        } catch (error) {
            const message = error.response?.data?.message || "Erreur lors du chargement de l'historique"
            set({
                message,
                historyLoading: false,
            })

        }}

}))