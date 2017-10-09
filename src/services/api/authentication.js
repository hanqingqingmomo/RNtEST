// @flow

type Service = {
  // signUp(user: SignupUser): Promise<string>,
  signIn(email: string, password: string): string,
  // updateSettings(user: SignupUser): Promise<SignupUser>,
};

const signIn = (transport: *) => async (email, password) => {
  const { data: { mobile_token } } = await transport.request({
    method: 'post',
    url: '/v1/members/login',
    data: {
      email,
      password,
    },
  });

  return mobile_token;
};

// const signUp = (transport: *) => async data => {
//   const response = await transport.request({
//     method: 'post',
//     url: '/v1/members/signup',
//     data,
//   });

//   return response.data.api_token;
// };

// const updateSettings = (transport: *) => async data => {
//   const response = await transport.request({
//     method: 'put',
//     url: '/v1/members/profile_settings',
//     data,
//   });

//   console.log(response);
// };

// export default function factory(transport: Axios): Service {
//   return {
//     // signUp: signUp(transport),
//     // signIn: signIn(transport),
//     // updateSettings: updateSettings(transport),
//   };
// }

export default function(http) {
  return ({
    signIn: signIn(http),
  }: Service);
}
