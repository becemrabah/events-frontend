import React, { useState } from 'react';
import { useGetEventsQuery, useDeleteEventMutation } from './eventsSlice';

const EventsList = () => {
  const { data, isLoading, isError, error } = useGetEventsQuery();
  const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation();

  const [filterLieu, setFilterLieu] = useState('');
  const [filterDateMin, setFilterDateMin] = useState('');

  if (isLoading) return <p className="text-center mt-8">Chargement...</p>;
  if (isError) return <p className="text-center text-red-600 mt-8">Erreur : {error?.data?.message || error?.error || 'Une erreur est survenue.'}</p>;

  const events = data?.events || [];

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet événement ?')) {
      try {
        await deleteEvent(id).unwrap();
      } catch (err) {
        alert('Erreur lors de la suppression : ' + (err.data?.message || err.message));
      }
    }
  };

  const filteredEvents = events.filter(event => {
    const matchLieu = filterLieu ? event.lieu.toLowerCase().includes(filterLieu.toLowerCase()) : true;
    const matchDate = filterDateMin ? new Date(event.date) >= new Date(filterDateMin) : true;
    return matchLieu && matchDate;
  });

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 py-10 px-4">
      <div className="w-full max-w-4xl bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Liste des evenements</h2>

        {/* 🔍 Filtres */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Filtrer par lieu"
            value={filterLieu}
            onChange={e => setFilterLieu(e.target.value)}
          className="p-2 border rounded w-40"

          />
          <input
            type="date"
            value={filterDateMin}
            onChange={e => setFilterDateMin(e.target.value)}
           className="p-2 border rounded w-40"

          />
        </div>

        {/* 📅 Tableau */}
        {filteredEvents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded shadow text-sm">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="py-2 px-4 text-left">Titre</th>
                  <th className="py-2 px-4 text-left">Lieu</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Participants</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map(event => (
                  <tr key={event._id} className="border-b hover:bg-gray-100">
                    <td className="py-2 px-4">{event.titre}</td>
                    <td className="py-2 px-4">{event.lieu}</td>
                    <td className="py-2 px-4">{new Date(event.date).toLocaleDateString()}</td>
                    <td className="py-2 px-4">{event.nbParticipants}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleDelete(event._id)}
                        disabled={isDeleting}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                      >
                        {isDeleting ? 'Suppression...' : 'Supprimer'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600">Aucun événement trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default EventsList;
