import React, { useState, useEffect } from 'react'
import './SubmitProperty.css'

function SubmitProperty() {
  const [propertyType, setPropertyType] = useState('')
  const [location, setLocation] = useState('')
  const [budget, setBudget] = useState('')
  const [details, setDetails] = useState('')
  const [myRequests, setMyRequests] = useState([])

  const email = localStorage.getItem('email')

  useEffect(() => {
    // Always reload requests from global storage
    const refreshRequests = () => {
      const allRequests = JSON.parse(localStorage.getItem('requests') || '[]')
      const mine = allRequests.filter((r) => r.userEmail === email)
      setMyRequests(mine)
    }

    refreshRequests()
    window.addEventListener('storage', refreshRequests)

    return () => window.removeEventListener('storage', refreshRequests)
  }, [email])

  const handleSubmit = (e) => {
    e.preventDefault()

    const allRequests = JSON.parse(localStorage.getItem('requests') || '[]')

    const newRequest = {
      id: Date.now(),
      userEmail: email,
      propertyType,
      location,
      budget,
      details,
      status: 'pending',
      responseTitle: '',
      responseText: '',
      respondedBy: ''
    }

    const updated = [...allRequests, newRequest]
    localStorage.setItem('requests', JSON.stringify(updated))
    setMyRequests(updated.filter((r) => r.userEmail === email))

    // notify other tabs (admin) to refresh
    window.dispatchEvent(new Event('storage'))

    setPropertyType('')
    setLocation('')
    setBudget('')
    setDetails('')

    alert('✅ Your request has been submitted to admin!')
  }

  return (
    <div className="submit-container">
      <h2>Submit Your Property for Personalized Ideas</h2>
      <form onSubmit={handleSubmit} className="submit-form">
        <input
          type="text"
          placeholder="Property Type (e.g., 2BHK Flat)"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location / City"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Budget (₹)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />
        <textarea
          placeholder="Describe problems or improvements (e.g., damp walls, small balcony...)"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
        />
        <button type="submit">Submit Property</button>
      </form>

      <h3>Your Submitted Requests</h3>
      <div className="requests-list">
        {myRequests.length === 0 && <p>No requests submitted yet.</p>}
        {myRequests.map((r) => (
          <div key={r.id} className="request-card">
            <p><strong>Type:</strong> {r.propertyType}</p>
            <p><strong>Location:</strong> {r.location}</p>
            <p><strong>Budget:</strong> ₹{r.budget}</p>
            <p><strong>Details:</strong> {r.details}</p>
            <p><strong>Status:</strong> {r.status}</p>

            {r.status === 'responded' && (
              <div className="response-block">
                <h4>Admin Suggestion: {r.responseTitle}</h4>
                <p>{r.responseText}</p>
                <p className="response-by">By: {r.respondedBy}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SubmitProperty
