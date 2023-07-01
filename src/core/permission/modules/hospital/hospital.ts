export const hospitalApp = {
  list: '/hospitalApp/list',
  getDataByDataid: '/hospitalApp/home',
} as const;
export const values = Object.values(hospitalApp);

export type hospitalAppPerms = typeof values[number];

export default hospitalApp;
