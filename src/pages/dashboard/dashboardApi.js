import { apiSlice } from '../../app/apiSlice';

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getDashboardStats: build.query({
      query: () => '/dashboard/stats',
        providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;
