import axios from 'axios';
import api from '../lib/axios.js'
import { ArrowLeftIcon } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const CreatePage = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate= useNavigate()

  const handleSubmit = async (e) => {
    // your submit logic
     e.preventDefault();
    console.log(title);
    console.log(content);
    if(!title.trim()||!content.trim()){
      toast.error("all fildes are required");

    }
    setLoading(true);
    try {
      await api.post("/notes", {
  title,
  content
});

      toast.success("created success fully");
      navigate("/")//navigate
    } catch (error) {
      toast.error("Faild to create the node")
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='card bg-base-100 '>
      <div className='container mx-auto px-4 py-8'>
        
        <div className='max-w-2xl mx-auto'>
          <Link to="/" className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5' />
            back to notes
          </Link>

          {/* Form example (if needed) */}
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full"
            />

            <textarea
              placeholder="Enter Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="textarea textarea-bordered w-full h-40"
            />

            <button 
              onClick={handleSubmit}
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Note"}
            </button>
          </div>

        </div>

       </div>
      </div>
    </div>
  )
}

export default CreatePage;
