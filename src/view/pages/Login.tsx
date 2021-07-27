import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { azureFunctionUrl, githubClientId } from '../../config';
const LoginGithub = require('react-login-github').default;
const { Octokit } = require('@octokit/rest');

interface ILoginProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void
}

export const Login = (props: ILoginProps) => {
  const history = useHistory();

  const onSuccess = async (response: any) => {
    axios
      .post(`${azureFunctionUrl}/api/GetGithubAuthToken`, {
        code: response.code,
      })
      .then((response: any) => {
        const octokit = new Octokit({
          auth: response.data.access_token,
        });
        localStorage.setItem("githubAccessToken", response.data.access_token);
        octokit.request('/user').then((response: any) => {
          localStorage.setItem("githubUser", JSON.stringify(response.data));
          props.setIsLoggedIn(true);
          if (!history.location.pathname.includes("/fluid/")) {
            history.push('/home');
          }
        });
      });
  };
  const onFailure = (response: any) => console.error(response);

  return (
    <div>
      <LoginGithub clientId={githubClientId} onSuccess={onSuccess} onFailure={onFailure} />
    </div>
  );
};
