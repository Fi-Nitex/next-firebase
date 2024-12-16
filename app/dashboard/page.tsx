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
import { Trash2, Plus, Search, Menu } from "lucide-react";

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
      <div className="min-h-screen bg-black text-gray-200">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-10">
          <form onSubmit={addNote} className="mb-8">
            <div className="bg-gray-800 rounded-lg shadow-lg p-4">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Take a note..."
                className="w-full bg-transparent border-none outline-none text-gray-200 placeholder-gray-400 text-lg"
              />
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-full hover:bg-yellow-600 transition-colors duration-300 flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" /> Add Note
                </button>
              </div>
            </div>
          </form>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {notes.length === 0 ? (
              <div className="col-span-full text-center py-8 text-gray-400">
                <p className="text-lg">No notes yet. Start writing!</p>
                <p className="text-sm mt-2">Your ideas are waiting...</p>
              </div>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-gray-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 group relative"
                >
                  <p className="text-gray-200 mb-4">{note.content}</p>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="absolute bottom-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
