import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
  winter: "winter",
  dracula: "dracula",
};

const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem("theme") || themes.winter;
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
};
const getUserFromLocalStorage = () => {
 
  return JSON.parse(localStorage.getItem("user")) || null
};

const initialState = {
  user:getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
  
};

const userSLice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginUser: (state, action) => {
     
      const user = {...action.payload.user, token:action.payload.jwt}
   
      state.user = user
      localStorage.setItem("user",JSON.stringify(user))
    
    },
    logoutUser: (state) => {
        state.user = null
        localStorage.removeItem("user")
        toast.success("Logedd out succesfully")
    },
    toggleTheme: (state) => {
      const { dracula, winter } = themes;
      state.theme = state.theme === dracula ? winter : dracula;
      document.documentElement.setAttribute("data-theme", state.theme);
      //  <html lang="en" data-theme="dracula">  bu sekilde html set etmiş oluyoruz
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { loginUser, logoutUser, toggleTheme, } = userSLice.actions;

export default userSLice.reducer;




