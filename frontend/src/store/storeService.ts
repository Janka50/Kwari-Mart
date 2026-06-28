import api from "@/lib/api";

export const createStore = async (
  formData: FormData,
  token: string
) => {
  const response = await api.post(
    "/stores/create/",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getMyStore = async (
    token: string
) => {

    const response = await api.get(
        "/stores/me/",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};