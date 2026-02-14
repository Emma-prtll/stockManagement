import axios from "axios"
import {create} from "zustand"

// Configuration of axios to accept credentials
axios.defaults.withCredentials = true

export const useCarHistoryStore = create((set) => ({

    //State of the store declaration and initialization
    carsHistory: [], // Use to stock the user datas that are from the backend
    message: "", // Use to display error or success messages
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
            const message = error.response?.data?.message || "There was an error while loading the datas"
            set({
                message,
                historyLoading: false,
            })

        }},

    getOneCarHistory: async (carId) => {
        set({ historyLoading: true })
        try {
            const response = await axios.get(`http://localhost:8000/api/carHistory/getOneCarHistory/${carId}`)
            set({ carHistory: response.data, historyLoading: false })
        } catch (error) {
            const message = error.response?.data?.message || "There was an error while loading the datas"
            set({ message, historyLoading: false })
        }
    }

}))