import React, { useEffect, useState } from 'react'
import './Ideas.css'

function Ideas() {
  const [ideas, setIdeas] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('ideas') || '[]')

    if (stored.length === 0) {
      const defaultIdeas = [
        {
          id: 1,
          title: 'Wall Repainting & Accent Wall',
          description: 'Refresh walls with light neutrals and one bold accent wall.',
          imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'
        },
        {
          id: 2,
          title: 'Smart Lighting Upgrade',
          description: 'Add smart lights, warm LED tones and dimmers for mood.',
          imageUrl: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353'
        },
        {
          id: 3,
          title: 'Balcony / Terrace Makeover',
          description: 'Add seating, plants, and string lights to beautify balconies.',
          imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb'
        }
      ]
      localStorage.setItem('ideas', JSON.stringify(defaultIdeas))
      setIdeas(defaultIdeas)
    } else {
      setIdeas(stored)
    }
  }, [])

  return (
    <div className="ideas-container">
      <h2>Ideas to Improve Your Home Value</h2>
      <p className="ideas-subtitle">Explore creative ideas added by admins to upgrade your home.</p>
      <div className="ideas-grid">
        {ideas.map((idea) => (
          <div className="idea-card" key={idea.id}>
            <img src={idea.imageUrl} alt={idea.title} className="idea-image" />
            <h3>{idea.title}</h3>
            <p>{idea.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Ideas
