import { useState } from "react";
import Image from "next/image";

interface EditProfilePictureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newPhotoURL: string) => void;
  currentPhotoURL: string;
}

export default function EditProfilePictureModal({
  isOpen,
  onClose,
  onSubmit,
  currentPhotoURL,
}: EditProfilePictureModalProps) {
  const [newPhotoURL, setNewPhotoURL] = useState(currentPhotoURL);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newPhotoURL);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Profile Picture</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Profile Picture
            </label>
            {currentPhotoURL ? (
              <Image
                src={currentPhotoURL}
                alt="Current profile picture"
                width={100}
                height={100}
                className="rounded-full"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>
          <input
            type="url"
            value={newPhotoURL}
            onChange={(e) => setNewPhotoURL(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Enter new profile picture URL"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
