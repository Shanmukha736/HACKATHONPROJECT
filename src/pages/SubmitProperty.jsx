import React, { useState } from 'react'
import './SubmitProperty.css'

function SubmitProperty() {
  const [form, setForm] = useState({ name: '', location: '', budget: '', type: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("✅ Property details submitted successfully!")
  }

  return (
    <div className="submit">
      <h2>🏡 Submit Your Property Details</h2>
      <form onSubmit={handleSubmit} className="submit-form float">
        <input name="name" placeholder="Owner Name" onChange={handleChange} required />
        <input name="location" placeholder="Location" onChange={handleChange} required />
        <input name="budget" placeholder="Budget (₹)" onChange={handleChange} required />
        <input name="type" placeholder="Home Type (e.g., Apartment)" onChange={handleChange} required />
        <button type="submit" className="btn-primary float">Submit</button>
      </form>
    </div>
  )
}

export default SubmitProperty
