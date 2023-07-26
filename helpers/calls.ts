const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const postRequest = (query: string, data: any) => {
  return fetch(BASE_URL + query, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: '',
    },
  });
};

export const getRequest = (query: string) =>
  fetch(BASE_URL + query, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: '',
    },
  });
