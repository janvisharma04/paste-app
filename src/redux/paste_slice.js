import { createSlice } from '@reduxjs/toolkit'
import {  toast } from 'react-toastify';
import Pastes from '../components/pastes';
const initialState = {
  pastes: localStorage.getItem("pastes")? JSON.parse(localStorage.getItem("pastes")):[]
}

export const pasteSlice = createSlice({
  name: 'pastes',
  initialState,
  reducers: {
    addtoPaste: (state,action) => {
      const paste=action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes",JSON.stringify(state.pastes))
      toast("pastes created successfully")
    },
    removePastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteId);
      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("paste deleted");
      }
    },    
    updatePaste: (state, action) => {
      const paste= action.payload;
      const index= state.pastes.findIndex((item)=>
        item._id===paste._id);
      if(index >= 0)
      {
        state.pastes[index]=paste;
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("paste updated");
      }
    },
    resetPaste: (state, action) => {
      state.pastes=[];
      localStorage.removeItem("pastes");
    },
  },
})

export const { addtoPaste, removePastes, updatePaste,resetPaste } = pasteSlice.actions

export default pasteSlice.reducer