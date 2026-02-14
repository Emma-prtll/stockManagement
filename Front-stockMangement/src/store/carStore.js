import axios from "axios";
import {create} from "zustand";

// Configuration of axios to accept credentials
axios.defaults.withCredentials = true

export const useCarStore = create((set) => ({

    //State of the store declaration and initialization
    cars: [], // Use to stock the user datas that are from the backend
    car: null,
    message: "", // Use to display error or success messages
    carLoading: false, // Use to display a loader

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

        set((state) => ({carLoading: !state.carLoading}))
        try {
            const response = await axios.put(`http://localhost:8000/api/car/updateItem/${id}`, data)
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

    deleteItem: async (id) => {

        set((state) => ({carLoading: !state.carLoading}))
        try {
            const response = await axios.delete(`http://localhost:8000/api/car/deleteItem/${id}`)
            set(() => ({car: response.data}))
            return response.data
        } catch (error) {
            const message = error.response?.data?.message
            set({ message })
        } finally {
            set((state) => ({carLoading: !state.carLoading}))
        }
    },

}))
