import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // stops Link navigation
    e.stopPropagation(); // stops click bubbling

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);

      setNotes((prev) => prev.filter((n) => n._id !== id));

      toast.success("Note deleted successfully");
    } catch (error) {
      toast.error("Failed to delete the note");
      console.log(error);
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-2xl transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>

        <p className="text-base-content/70 line-clamp-3">
          {note.content}
        </p>

        <span className="text-sm text-base-content/60 mt-2">
          {note.createdAt}
        </span>

        <div className="flex items-center justify-between mt-4">
          <PenSquareIcon className="size-4" />

          <button
            className="btn btn-ghost text-red-700"
            onClick={(e) => handleDelete(e, note._id)}
          >
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
  