import React, { useState } from 'react'
import { useCreateEventMutation } from './eventsSlice'

export default function AddEvent() {
  const [createEvent, { isLoading }] = useCreateEventMutation()

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [participants, setParticipants] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !date || !location || !participants) return

    try {
      await createEvent({
        titre: title,
        date,
        lieu: location,
        nbParticipants: Number(participants),
      }).unwrap()

      setTitle('')
      setDate('')
      setLocation('')
      setParticipants('')
    } catch (err) {
      console.error('Erreur lors de la création de l’événement :', err)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-700 p-6 rounded mb-6 max-w-lg mx-auto"
    >
       <h2 className="text-center text-2xl font-semibold mb-6">Ajouter une événements</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-1 font-semibold text-white">
          Titre
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded text-black"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="date" className="block mb-1 font-semibold text-white">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 rounded text-black"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="location"
          className="block mb-1 font-semibold text-white"
        >
          Lieu
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 rounded text-black"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="participants"
          className="block mb-1 font-semibold text-white"
        >
          Nombre de participants
        </label>
        <input
          type="number"
          id="participants"
          min="0"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
          className="w-full p-2 rounded text-black"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {isLoading ? 'Ajout en cours...' : 'Ajouter'}
      </button>
    </form>
  )
}
