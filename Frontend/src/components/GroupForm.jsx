import { Loader, X } from 'lucide-react';
import React, { useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useGroupStore } from '../store/useGroupStore';

export default function GroupForm({ setOpenGroup }) {
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { users } = useChatStore();
  const {createGroup,isGroupsLoading} = useGroupStore()

  const handleNameChange = (e) => setGroupName(e.target.value);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = () => {
      // Set the group image to Base64 string
      setGroupImage(reader.result);
    };
    
    reader.readAsDataURL(file);
  };
  

  const handleMemberSelect = (userId) => {
    // Add or remove the user from selected members
    setSelectedMembers((prevMembers) => {
      if (prevMembers.includes(userId)) {
        return prevMembers.filter((id) => id !== userId); // Remove from selected
      } else {
        return [...prevMembers, userId]; // Add to selected
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createGroup({
      members: selectedMembers,
      name: groupName,
      image: groupImage,
    });
    
    // Set 2 sec timeout and close setOpenGroup
    setTimeout(() => {
      setOpenGroup((state)=>!state);
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-900 dark:text-white">
          Create a Group
        </h2>
        <X className="cursor-pointer" onClick={() => setOpenGroup(false)} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Group Name */}
        <div>
          <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Group Name
          </label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={handleNameChange}
            placeholder="Enter group name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
        </div>

        {/* Group Image */}
        <div>
          <label htmlFor="groupImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Group Image (optional)
          </label>
          <input
            type="file"
            id="groupImage"
            onChange={handleImageChange}
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-700 dark:text-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        {/* Select Group Members */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Members</label>
          <div className="space-y-2 mt-2">
            {users.map((user) => (
              <div key={user._id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`user-${user._id}`}
                  checked={selectedMembers.includes(user._id)}
                  onChange={() => handleMemberSelect(user._id)}
                  className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor={`user-${user._id}`} className="text-sm text-gray-800 dark:text-gray-200">
                  <div className='flex gap-3'>
                  <img className=' size-8 rounded-full object-cover' src={user.profilePic} alt="" />
                  {user.fullName}
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="cursor-pointer w-full bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            {isGroupsLoading ?<Loader className='ml-[100px] animate-spin'/>: "Create Group"}
          </button>
        </div>
      </form>
    </div>
  );
}
