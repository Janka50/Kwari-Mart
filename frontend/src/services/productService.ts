import api from "@/lib/api";

export const getMyProducts = async (
  token: string
) => {
  const response = await api.get(
    "/products/my/",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const createProduct = async (
  formData: FormData,
  token: string
) => {
  const response = await api.post(
    "/products/create/",
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

export const deleteProduct = async (
  id: number,
  token: string
) => {
  const response = await api.delete(
    `/products/${id}/delete/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateProduct = async (
  id: number,
  formData: FormData,
  token: string
) => {
  const response = await api.put(
    `/products/${id}/update/`,
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

export const getProduct = async (
  id: number
) => {
  const response = await api.get(
    `/products/${id}/`
  );

  return response.data;
};

export const getStoreProducts = async (
  storeId: number
) => {
  const response = await api.get(
    `/products/store/${storeId}/`
  );

  return response.data;
};

export const getProducts = async () => {
  const response = await api.get("/products/");
  return response.data;
};