import {create} from "zustand";

export const useCounterStore= create((set)=>({
    counter:0,
    userName: 'Amany',
    increase:(n)=>set((state) =>({
        counter:state.counter+n
    })),
    descrease:()=>set((state) =>({
        counter:state.counter-1
    }))
}));