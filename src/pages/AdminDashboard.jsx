import React, { useEffect, useState } from 'react'
import './AdminDashboard.css'

function AdminDashboard() {
  const [ideas, setIdeas] = useState([])
  const [requests, setRequests] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [editingId, setEditingId] = useState(null)

  const adminEmail = localStorage.getItem('email')

  useEffect(() => {
    const loadData = () => {
      const storedIdeas = JSON.parse(localStorage.getItem('ideas') || '[]')
      const storedRequests = JSON.parse(localStorage.getItem('requests') || '[]')
      setIdeas(storedIdeas)
      setRequests(storedRequests)
    }

    loadData()
    window.addEventListener('storage', loadData)
    return () => window.removeEventListener('storage', loadData)
  }, [])

  const saveIdeas = (list) => {
    setIdeas(list)
    localStorage.setItem('ideas', JSON.stringify(list))
  }

  const saveRequests = (list) => {
    setRequests(list)
    localStorage.setItem('requests', JSON.stringify(list))
    window.dispatchEvent(new Event('storage'))
  }

  const handleAddOrUpdateIdea = (e) => {
    e.preventDefault()
    if (!title || !description || !imageUrl) {
      alert('⚠️ Please fill all fields')
      return
    }

    if (editingId) {
      const updated = ideas.map((idea) =>
        idea.id === editingId ? { ...idea, title, description, imageUrl } : idea
      )
      saveIdeas(updated)
      setEditingId(null)
    } else {
      const newIdea = {
        id: Date.now(),
        title,
        description,
        imageUrl,
        createdBy: adminEmail
      }
      saveIdeas([...ideas, newIdea])
    }

    setTitle('')
    setDescription('')
    setImageUrl('')
  }

  const handleEditIdea = (idea) => {
    setTitle(idea.title)
    setDescription(idea.description)
    setImageUrl(idea.imageUrl)
    setEditingId(idea.id)
  }

  const handleDeleteIdea = (id) => {
    const updated = ideas.filter((idea) => idea.id !== id)
    saveIdeas(updated)
  }

  const handleRespond = (id) => {
    const title = prompt('Enter suggestion title:')
    if (!title) return
    const text = prompt('Enter detailed suggestion:')
    if (!text) return

    const updatedRequests = requests.map((req) =>
      req.id === id
        ? {
            ...req,
            status: 'responded',
            responseTitle: title,
            responseText: text,
            respondedBy: adminEmail
          }
        : req
    )

    saveRequests(updatedRequests)
    alert('✅ Suggestion sent to user!')
  }

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      <section className="admin-section">
        <h3>Manage Ideas</h3>
        <form onSubmit={handleAddOrUpdateIdea} className="admin-form">
          <input
            type="text"
            placeholder="Idea Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <textarea
            placeholder="Idea Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">
            {editingId ? 'Update Idea' : 'Add Idea'}
          </button>
        </form>

        <div className="admin-ideas-list">
          {ideas.map((idea) => (
            <div key={idea.id} className="admin-idea-card">
              <img src={idea.imageUrl} alt={idea.title} />
              <h4>{idea.title}</h4>
              <p>{idea.description}</p>
              <p className="idea-meta">By: {idea.createdBy || 'Admin'}</p>
              <div className="idea-actions">
                <button onClick={() => handleEditIdea(idea)}>Edit</button>
                <button onClick={() => handleDeleteIdea(idea.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <h3>User Property Requests</h3>
        {requests.length === 0 && <p>No user requests yet.</p>}
        {requests.map((req) => (
          <div key={req.id} className="admin-request-card">
            <p><strong>User:</strong> {req.userEmail}</p>
            <p><strong>Type:</strong> {req.propertyType}</p>
            <p><strong>Location:</strong> {req.location}</p>
            <p><strong>Budget:</strong> ₹{req.budget}</p>
            <p><strong>Details:</strong> {req.details}</p>
            <p><strong>Status:</strong> {req.status}</p>

            {req.status === 'pending' && (
              <button onClick={() => handleRespond(req.id)}>Give Suggestion</button>
            )}

            {req.status === 'responded' && (
              <div className="response-block">
                <h4>Suggestion Sent</h4>
                <p><strong>{req.responseTitle}</strong></p>
                <p>{req.responseText}</p>
                <p className="response-by">By: {req.respondedBy}</p>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  )
}

export default AdminDashboard
