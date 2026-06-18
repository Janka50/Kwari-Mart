from django.urls import path

from .views import (
    CreateOrderView,
    MyOrdersView,
    MerchantOrdersView,
    UpdateOrderStatusView,
)

urlpatterns = [

    path(
        "create/",
        CreateOrderView.as_view(),
        name="create-order",
    ),

    path(
        "my/",
        MyOrdersView.as_view(),
        name="my-orders",
    ),

    path(
        "merchant/",
        MerchantOrdersView.as_view(),
        name="merchant-orders",
    ),
    
    path(
    "<int:pk>/status/",
    UpdateOrderStatusView.as_view(),
    name="order-status",
    ),
]