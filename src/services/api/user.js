// @flow

type Service = {
  getProfile(id: string | number): Object,
};

const getProfile = (transport: *) => async id => {
  const response = await transport.get(`/v1/members/${id === 'me' ? '' : id}`);
  return response.data;
};

export default function(http) {
  return ({
    getProfile: getProfile(http),
  }: Service);
}
