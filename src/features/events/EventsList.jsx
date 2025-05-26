import React, { useState } from 'react';
import { useGetEventsQuery, useDeleteEventMutation } from './eventsSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const EventsList = () => {
  const { data, isLoading, isError, error } = useGetEventsQuery();
  const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation();

  const [filterLieu, setFilterLieu] = useState('');
  const [filterDateMin, setFilterDateMin] = useState('');

  if (isLoading) return <p className="text-center mt-4">Chargement...</p>;
  if (isError) return <p className="text-center text-danger mt-4">Erreur : {error?.data?.message || error?.error || 'Une erreur est survenue.'}</p>;

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
    <div className="min-vh-100 d-flex justify-content-center bg-dark text-white py-5 px-3">
      <div className="w-100" style={{ maxWidth: '1000px' }}>
        <div className="bg-white text-dark p-4 rounded shadow-sm">
          <h2 className="h4 text-center mb-4">Liste des événements</h2>

          {/* 🔍 Filtres */}
          <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-3 mb-4">
            <input
              type="text"
              placeholder="Filtrer par lieu"
              value={filterLieu}
              onChange={e => setFilterLieu(e.target.value)}
              className="form-control w-auto"
            />
            <input
              type="date"
              value={filterDateMin}
              onChange={e => setFilterDateMin(e.target.value)}
              className="form-control w-auto"
            />
          </div>

          {/* 📅 Tableau */}
          {filteredEvents.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-bordered table-hover table-sm">
                <thead className="table-dark">
                  <tr>
                    <th>Titre</th>
                    <th>Lieu</th>
                    <th>Date</th>
                    <th>Participants</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map(event => (
                    <tr key={event._id}>
                      <td>{event.titre}</td>
                      <td>{event.lieu}</td>
                      <td>{new Date(event.date).toLocaleDateString()}</td>
                      <td>{event.nbParticipants}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(event._id)}
                          disabled={isDeleting}
                          className="btn btn-sm btn-danger"
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
            <p className="text-center text-muted">Aucun événement trouvé.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsList;
