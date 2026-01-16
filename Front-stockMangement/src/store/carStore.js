//Import des librairies
import axios from "axios"
import {create} from "zustand"

//On configure axios pour qu'il accepte les "credentials"
axios.defaults.withCredentials = true

export const useCarStore = create((set) => ({
    //Déclaration et initialisation des stats du store
    cars: [], //Utilisé pour stocker les données utilisateur qui vienne du backend
    car: null,
    message: "", //Utilisé pour afficher les messages d'erreur ou de succès
    carLoading: false, //Utilisé pour activer ou désactiver un loader

    addItem: async (data) => {
        set((state) => ({carLoading: !state.carLoading}))
        try {
            const response =  await axios.post('http://localhost:8000/api/car/addItem', data)
            set(() => ({car: response.data}))
            return response.data
        } catch (error) {
            const message = error.response?.data?.message
            set({ message })
            throw new Error(message)
        } finally {
            set((state) => ({carLoading: !state.carLoading}))
        }
    },

    getCars: async () => {
        set({carLoading: true})
        try {
            const response = await axios.get('http://localhost:8000/api/car/getCars')
            set({cars: response.data})
        } catch (error) {
            set((state) => ({message: error.response.data.message || error.response}))
        } finally {
            set((state) => ({carLoading: false}))
        }
    },

    getACar: async (id) => {
        set({carLoading: true})
        try {
            const response = await axios.get(`http://localhost:8000/api/car/getACar/${id}`)
            set({cars: response.data})
        } catch (error) {
            set((state) => ({message: error.response.data.message || error.response}))
        } finally {
            set((state) => ({carLoading: !state.carLoading}))
        }
    },

    updateItem: async (id, data) => {

        // set((state) => ({carLoading: !state.carLoading}))
        // const response = await axios.put(`http://localhost:8000/api/car/updateItem/${id}`, data)
        // set(() => ({car: response.data}))
        // set((state) => ({carLoading: !state.carLoading}))

        set((state) => ({carLoading: !state.carLoading}))
        try {
            const response = await axios.put(`http://localhost:8000/api/car/updateItem/${id}`, data)
            set(() => ({car: response.data}))
            return response.data
        } catch (error) {
            // set(() => ({message: error.response.data}))
            const message = error.response?.data?.message
            set({ message })
            throw new Error(message)
        } finally {
            set((state) => ({carLoading: !state.carLoading}))
        }

    },

    deleteItem: async (id) => {

        // set((state) => ({carLoading: !state.carLoading}))
        // const response = await axios.delete(`http://localhost:8000/api/car/deleteItem/${id}`)
        // set(() => ({message: response.data}))


        set((state) => ({carLoading: !state.carLoading}))
        try {
            const response = await axios.delete(`http://localhost:8000/api/car/deleteItem/${id}`)
            set(() => ({car: response.data}))
            return response.data
        } catch (error) {
            // set(() => ({message: error.response.data}))
            const message = error.response?.data?.message
            set({ message })
            // throw new Error(message)
        } finally {
            set((state) => ({carLoading: !state.carLoading}))
        }
    },

}))
