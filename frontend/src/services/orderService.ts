import api from "@/lib/api";

export const createOrder = async (
  product: number,
  quantity: number,
  token: string
) => {
  const response = await api.post(
    "/orders/create/",
    {
      product,
      quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getMyOrders = async (
  token: string
) => {
  const response = await api.get(
    "/orders/my/",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getMerchantOrders = async (
  token: string
) => {
  const response = await api.get(
    "/orders/merchant/",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateOrderStatus = async (
  id: number,
  status: string,
  token: string
) => {
  const response = await api.patch(
    `/orders/${id}/status/`,
    {
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};