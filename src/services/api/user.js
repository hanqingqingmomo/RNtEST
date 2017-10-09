// @flow

type Service = {
  getProfile(id: string | number): Object,
  updateProfile(data: Object): Object,
};

const getProfile = (transport: *) => async id => {
  const response = await transport.get(`/v1/members/${id === 'me' ? '' : id}`);
  return response.data;
};

const updateProfile = (transport: *) => async data => {
  const response = await transport.put(`/v1/members/profile_settings`, data);
  return response.data;
};

export default function(http) {
  return ({
    getProfile: getProfile(http),
    updateProfile: updateProfile(http),
  }: Service);
}
