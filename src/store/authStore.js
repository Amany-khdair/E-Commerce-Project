import { create } from "zustand";

const useAuthStore = create((set)=>({
    token: localStorage.getItem("token"),
    
    setToken: (token)=>{
        localStorage.setItem("token", token);
        set({token})//set here act as set state
    },

    logout:()=>{
        localStorage.removeItem("token");
        set({token: null})
    }
}));

export default useAuthStore;