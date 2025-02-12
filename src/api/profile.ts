import { ProfileApiResponse, ProfileDetail, ProfileDetailResponse } from 'type/profile';

const API_BASE_URL = 'https://reqres.in/api';

export const getProfileList = (page: number): Promise<ProfileApiResponse> => {
  return fetch(`${API_BASE_URL}/users?page=${page}`).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  });
};

export const getProfileDetail = (id: number): Promise<ProfileDetail> => {
  return fetch(`${API_BASE_URL}/users/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((response: ProfileDetailResponse) => response.data);
};

export const createProfile = (
  name: string,
  email: string
): Promise<{ name: string; email: string }> => {
  return fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      if (!data.name || !data.email) {
        throw new Error('API 응답에 name 또는 email이 없습니다.');
      }
      return data;
    })
    .catch((err) => {
      console.error('API 요청 실패:', err);
      throw err;
    });
};
