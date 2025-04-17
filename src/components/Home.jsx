import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, useSearchParams } from 'react-router';
import { addtoPaste, updatePaste } from '../redux/paste_slice';

const Home = () => {
const[title,setTitle]=useState("");
const[value,setValue]= useState("");
const[searchParams,setSearchParams]=useSearchParams();
const pasteId=searchParams.get("pasteId");
const dispatch = useDispatch();
const allpastes = useSelector((state)=> state.paste.pastes);

useEffect(()=>{
  if(pasteId)
  {
    const paste= allpastes.find((p)=>p._id===pasteId);
    setTitle(paste.title);
    setValue(paste.content);
  }
},[pasteId])

function createPaste(){
  const Paste={
    title: title,
    content : value,
    _id:pasteId ||
    Date.now().toString(36),
    createdAt:new Date().toISOString(),
  }
    if(pasteId){
       //update
       dispatch(updatePaste(Paste));
    }
    else{
//create
        dispatch(addtoPaste(Paste));
    }
    //after createion or updation
    setTitle("");
    setValue('');
    setSearchParams({});
}
  return (
    <div>
    <div className='flex flex-row gap-7 place-content-between'>
      <input
      className='pl-2 p-2 rounded-2xl mt-2 w-[60%]'
      type='text'
      placeholder='enter title here'
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      />

      <button className='p-2 rounded-2xl mt-2' onClick={createPaste}>
  {pasteId ? "Update Paste" : "Create Paste"}
</button>
    </div>
    <div className='relative mt-4 w-fit'>
      <textarea className='mt-4 rounded-2xl p-4 min-w-[500px]'
      placeholder='enter your text here'
      type='text'
      value={value}
      onChange={(e)=>setValue(e.target.value)}
      rows={20}
      
      />
      <button
    className="absolute top-6 right-6 px-3 py-1 rounded-md text-sm"
    onClick={() => {
      navigator.clipboard.writeText(value); // or `paste?.content` if from redux
      toast.success("Copied to clipboard!");
    }}
  >
    Copy
  </button>
    </div>
    </div>
  )
}

export default Home
