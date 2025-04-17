import React from 'react'
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

const Viewpaste = () => {
  const { id } = useParams();
  const allpastes = useSelector((state) => state.paste.pastes);
  const paste = allpastes.find((p) => p._id === id); // using _id

  console.log("final paste:", paste);

  if (!paste) {
    return <div className="p-4">Paste not found.</div>;
  }

  return (
    <div>
      <div className='flex flex-row gap-7 place-content-between'>
        <input
          className='pl-2 p-2 rounded-2xl mt-2 w-[60%]'
          type='text'
          placeholder='enter title here'
          value={paste.title}
          disabled
        />
      </div>
      <div className='mt-4'>
        <textarea
          className='mt-4 rounded-2xl p-4 min-w-[500px]'
          placeholder='enter your text here'
          type='text'
          value={paste.content}
          disabled
          rows={20}
        />
      </div>
    </div>
  );
}

export default Viewpaste;
