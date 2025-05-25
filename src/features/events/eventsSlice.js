import { apiSlice } from '../../app/apiSlice';

export const eventApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => '/events/events',
      providesTags: ['Event','Dashboard'],
    }),
    createEvent: builder.mutation({
      query: (eventData) => ({
        url: '/events/events',
        method: 'POST',
        body: eventData,
      }),
      invalidatesTags: ['Event','Dashboard'],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/events/events/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Event','Dashboard'],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useCreateEventMutation,
  useDeleteEventMutation,
} = eventApi;
