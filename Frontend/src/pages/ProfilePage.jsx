import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

export default function ProfilePage() {
    const{authUser}=useAuthStore()
  return (
    <div>ProfilePage</div>
  )
}
