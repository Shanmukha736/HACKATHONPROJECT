import React from 'react'
import './Ideas.css'

function Ideas() {
  const ideas = [
    { 
      title: "Modular Kitchen", 
      desc: "Upgrade your kitchen with smart storage and modern finishes.", 
      cost: "₹80,000 – ₹1,50,000",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
    },
    { 
      title: "Solar Panels", 
      desc: "Save energy and reduce bills with rooftop solar solutions.", 
      cost: "₹1,20,000 – ₹2,50,000",
      img: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=900&q=80"
    },
    { 
      title: "Balcony Garden", 
      desc: "Create a peaceful green corner in your home.", 
      cost: "₹10,000 – ₹25,000",
      img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=900&q=80"
    },
    { 
      title: "Wall Repainting", 
      desc: "Give your house a fresh new look with trendy colors.", 
      cost: "₹20,000 – ₹50,000",
      img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80"
    },
    { 
      title: "Smart Lighting", 
      desc: "Install energy-efficient, sensor-based lighting for a modern glow.", 
      cost: "₹5,000 – ₹15,000",
      img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80"
    },
  ]

  return (
    <div className="ideas">
      <h2>✨ Home Improvement Ideas</h2>
      <p className="intro">
        Simple, affordable upgrades to make your home stylish, sustainable, and valuable.
      </p>

      <div className="idea-grid">
        {ideas.map((idea, i) => (
          <div className="idea-card float" key={i}>
            <img 
              src={idea.img} 
              alt={idea.title} 
              onError={(e) => e.target.src = "https://via.placeholder.com/400x250?text=Image+Unavailable"} 
            />
            <div className="idea-info">
              <h3>{idea.title}</h3>
              <p>{idea.desc}</p>
              <p className="cost">Estimated Cost: <span>{idea.cost}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Ideas
