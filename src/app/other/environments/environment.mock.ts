/**
 * Environment variables:
 * - baseUrl: The base url for the backend api
 * - mock: If true, the mock interceptor simulates the backend
 */
export const environment: {
  baseUrl: string;
  mapsApiKey: string;
  mock: boolean;
} = {
  baseUrl: 'https://nest.template.dev.28apps-software.de/',
  mapsApiKey: 'AIzaSyCokvPfNoLOKy5aPfPxrIQF_FpJ7U6YbLU',
  mock: true,
};
