//Import des librairies
import axios from "axios";
import {create} from "zustand";

//On configure axios pour qu'il accepte les "credentials"
axios.defaults.withCredentials = true

//On crée notre store
    //use nous permet (par react) de créer un hook
    //create() = methode de zustand
export const useUserStore = create((set) => ({}))