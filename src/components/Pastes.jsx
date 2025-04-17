import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removePastes } from '../redux/paste_slice'
import { toast } from 'react-toastify'
import { Link } from 'react-router'

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes)
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch()
  const filteredData = pastes.filter((paste) =>
    paste.title?.toLowerCase().includes(searchTerm.toLowerCase())
  )
  function handleShare(paste) {
    const shareLink = `${window.location.origin}/paste/${paste._id}`;

    if (navigator.share) {
      navigator.share({
        title: paste.title,
        text: paste.content,
        url: shareLink,
      })
        .then(() => {
          toast.success("Shared successfully!");
        })
        .catch((error) => {
          console.error("Error sharing", error);
          toast.error("Sharing failed or was cancelled.");
        });
    } else {
      toast.warn("Sharing is not supported on this device.");
    }
  }


  function handleDelete(pasteId) {
    dispatch(removePastes(pasteId));
  }


  return (
    <div>
      <input
        className='p-2 min-w-[600px] mt-5 rounded-2xl'
        type='search'
        placeholder='search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='flex flex-col gap-5 mt-5'>
        {
          filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div key={paste?._id} className='border'>
                <div className='flex place-content-center'>
                  {paste.title}
                </div>
                <div className='flex place-content-center'>
                  {paste.content}
                </div>
                <div className='flex flex-row gap-4 place-content-evenly'>
                  <button onClick={() => {
                    navigator.clipboard.writeText(paste?.content)
                    toast.success("copied to clipboard")
                  }}>copy</button>
                  <button>
                  <Link to={`/pastes/${paste?._id}`}>
                    view
                  </Link>
                  </button>
                  <button onClick={() => handleDelete(paste?._id)}>delete</button>
                  <button onClick={() => handleShare(paste)}>share</button>
                  <button>
                    <Link to={`/?pasteId=${paste?._id}`}>
                    edit
                    </Link>
                  </button>
                </div>
                <div className='flex place-content-center'>
                  {paste.createdAt}
                </div>

              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Paste
