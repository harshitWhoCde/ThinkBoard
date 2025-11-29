import axios from 'axios';
import api from "../api/axiosConfig";  // <-- ADD THIS
import { ArrowLeftIcon } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      await api.post("/notes", { title, content });   // <-- FIXED
      toast.success("Created successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create the note");
    } finally {
      setLoading(false);
    }
  };
