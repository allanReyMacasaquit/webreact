import { createContext, useContext } from "react";
import { store } from "../store";

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}

