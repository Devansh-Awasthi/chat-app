import { create } from "zustand";

export const useThemeStore = create((stat) => ({
    theme:localStorage.getItem('chat-theme') || 'coffee'
    ,
    setTheme:(theme)=>{
        localStorage.setItem('chat-theme',theme)
        stat({theme});

    }
}))