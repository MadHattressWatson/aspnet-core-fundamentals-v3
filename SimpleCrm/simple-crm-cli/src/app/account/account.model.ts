export interface CredentialsViewModel {
  emailAddress: string;
  password: string;
}

export interface MicrosoftOptions {
  client_id: string;
  scope: string;
  state: string;
}

export interface MicrosoftAuthViewModel {
  accessToken: string;
  state: string;
  baseHref: string;
}

export interface UserSummaryViewModel {
  id: string;
  name: string;
  emailAddress: string;
  jwtToken: string;
  roles: string[];
}

export function anonymousUser(): UserSummaryViewModel {
  return {
      id: '',
      name: 'Anonymous',
      emailAddress: '',
      jwtToken: '',
      roles: []
  };
}


