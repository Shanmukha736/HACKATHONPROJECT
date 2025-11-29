import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <section className="hero-section">
        <div className="overlay">
          <div className="hero-content">
            <h1 className="hero-title glow-text">
              Enhance the Beauty and Value of Your Home
            </h1>
            <p className="hero-quote">"Transforming homes, uplifting lives."</p>
            <p className="hero-desc">
              ValueAdd Homes helps Indian families turn ordinary spaces into extraordinary ones —
              with simple, affordable, and elegant ideas that bring warmth and worth to every corner.
            </p>
            <div className="hero-buttons">
              <button onClick={() => navigate('/ideas')} className="float">Explore Ideas</button>
              <button className="secondary float" onClick={() => navigate('/submit')}>
                Submit Property
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
