import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import RateLimiterUI from "../components/RateLimiterUI.jsx";
import axios from "axios";
import { toast } from "react-hot-toast";
import NoteCard from "../components/NoteCard.jsx";
import api from "../lib/axios.js";
import NotesNotFound from "../components/NotesNotFound.jsx";

const Home = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes:", error);

        if (error.response?.status === 429) {
          setIsRateLimited(true);
          toast.error("Too many requests. Try again in a few seconds.");
        } else {
          toast.error("Failed to load the notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Rate Limit UI */}
      {isRateLimited && <RateLimiterUI />}

      {/* Loading State */}
      {loading && (
        <p className="text-center mt-10">Loading...</p>
      )}
      {notes.length===0&& !isRateLimited&& <NotesNotFound/>}

      {/* Notes Grid */}
      {!loading && notes.length > 0 && !isRateLimited && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
