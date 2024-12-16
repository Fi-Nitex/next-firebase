"use client";

import { useState, useRef, useEffect } from "react";
import { User, updateProfile, deleteUser } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { UserIcon, Settings, LogOut, Trash2 } from "lucide-react";
import Image from "next/image";
import EditNameModal from "./EditNameModal";
import EditProfilePictureModal from "./EditProfilePictureModal";
import DeleteAccountModal from "./DeleteAccountModal";

export default function UserButton() {
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const [showEditProfilePictureModal, setShowEditProfilePictureModal] =
    useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditName = async (newName: string) => {
    if (user) {
      try {
        await updateProfile(user, { displayName: newName });
        setUser({ ...user, displayName: newName });
        setShowEditNameModal(false);
      } catch (error) {
        console.error("Error updating name:", error);
        alert("Failed to update name. Please try again.");
      }
    }
  };

  const handleEditProfilePicture = async (newPhotoURL: string) => {
    if (user) {
      try {
        await updateProfile(user, { photoURL: newPhotoURL });
        setUser({ ...user, photoURL: newPhotoURL });
        setShowEditProfilePictureModal(false);
      } catch (error) {
        console.error("Error updating profile picture:", error);
        alert("Failed to update profile picture. Please try again.");
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (user) {
      try {
        await deleteUser(user);
        setShowDeleteAccountModal(false);
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Failed to delete account. Please try again.");
      }
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 bg-gray-800 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      >
        {user.photoURL ? (
          <Image
            src={user.photoURL}
            alt="User avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <UserIcon className="h-6 w-6 text-gray-300" />
        )}
        <span className="text-sm font-medium text-white">
          {user.displayName || "User"}
        </span>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <button
              onClick={() => setShowEditNameModal(true)}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <Settings className="inline-block mr-2 h-4 w-4" /> Edit Name
            </button>
            <button
              onClick={() => setShowEditProfilePictureModal(true)}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <UserIcon className="inline-block mr-2 h-4 w-4" /> Change Profile
            </button>
            <button
              onClick={() => auth.signOut()}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <LogOut className="inline-block mr-2 h-4 w-4" /> Sign Out
            </button>
            <button
              onClick={() => setShowDeleteAccountModal(true)}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              role="menuitem"
            >
              <Trash2 className="inline-block mr-2 h-4 w-4" /> Delete Account
            </button>
          </div>
        </div>
      )}

      <EditNameModal
        isOpen={showEditNameModal}
        onClose={() => setShowEditNameModal(false)}
        onSubmit={handleEditName}
        currentName={user.displayName || ""}
      />
      <EditProfilePictureModal
        isOpen={showEditProfilePictureModal}
        onClose={() => setShowEditProfilePictureModal(false)}
        onSubmit={handleEditProfilePicture}
        currentPhotoURL={user.photoURL || ""}
      />
      <DeleteAccountModal
        isOpen={showDeleteAccountModal}
        onClose={() => setShowDeleteAccountModal(false)}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
}
