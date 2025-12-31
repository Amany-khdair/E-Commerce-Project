import { create } from "zustand";

const useAuthStore = create((set)=>({
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user")) || null,
    setToken: (token)=>{
        localStorage.setItem("token", token);
        set({token})//set here act as set state
    },

    setUser:(user)=>{
       localStorage.setItem("user", JSON.stringify(user));
       set({ user });
    },

    logout:()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({token: null})
    }
}));

export default useAuthStore;