import React from 'react'

export default function User() {
    return (
        <div className="flex items-center py-2 px-4 bg-[#242526]  rounded-lg">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D" className="w-16 h-16 rounded-full object-cover" />
            <div className="ml-4">
                <span className="block text-lg font-semibold text-[#E0E3E7]">Anik Das</span>
                <span className="block text-sm text-gray-500">last message </span>
            </div>
        </div>
    );
}