import React from 'react'
import { useNavigate } from 'react-router-dom'

function DocumentUpload() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/upload')  // Navigate to upload page
  }

  return (
    <button 
      onClick={handleClick}
      className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-150 font-medium"
    >
      Upload Document
    </button>
  )
}

export default DocumentUpload