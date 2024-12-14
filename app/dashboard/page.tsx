"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Trash2, Plus, Notebook } from "lucide-react";

export default function Dashboard() {
  const [notes, setNotes] = useState<{ id: string; content: string }[]>([]);
  const [newNote, setNewNote] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "notes"), where("userId", "==", user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const notesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          content: doc.data().content,
        }));
        setNotes(notesData);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const addNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim() && user) {
      await addDoc(collection(db, "notes"), {
        content: newNote,
        userId: user.uid,
        createdAt: new Date(),
      });
      setNewNote("");
    }
  };

  const deleteNote = async (id: string) => {
    await deleteDoc(doc(db, "notes", id));
  };

  return (
    <ProtectedRoute>
      <div className="min-h-full p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <Notebook className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-extrabold text-gray-800">
              Your Notes Dashboard
            </h1>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-6 border-2 border-indigo-100 transition-all duration-300 hover:shadow-2xl">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center gap-2">
              <Plus className="w-6 h-6" /> Add a New Note
            </h2>
            <form onSubmit={addNote} className="flex items-center space-x-4">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="What's on your mind?"
                className="flex-grow px-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" /> Add Note
              </button>
            </form>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-6 border-2 border-indigo-100 transition-all duration-300 hover:shadow-2xl">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              Your Notes
            </h2>
            {notes.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p className="text-lg">No notes yet. Start writing!</p>
                <p className="text-sm mt-2">Your ideas are waiting...</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {notes.map((note) => (
                  <li
                    key={note.id}
                    className="flex items-center justify-between bg-indigo-50 p-4 rounded-lg shadow-sm hover:bg-indigo-100 transition-all duration-300 group"
                  >
                    <span className="text-gray-700 flex-grow pr-4">
                      {note.content}
                    </span>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="text-red-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all duration-300 focus:outline-none"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}