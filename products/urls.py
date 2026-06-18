from django.urls import path

from .views import (
    CreateProductView,
    MyProductsView,
    UpdateProductView,
    DeleteProductView,
    ProductListView,
    ProductDetailView,
    StoreProductsView,
)

urlpatterns = [

    path(
        "",
        ProductListView.as_view(),
        name="product-list",
    ),

    path(
        "<int:pk>/",
        ProductDetailView.as_view(),
        name="product-detail",
    ),

    path(
        "create/",
        CreateProductView.as_view(),
        name="create-product",
    ),

    path(
        "my/",
        MyProductsView.as_view(),
        name="my-products",
    ),

    path(
        "<int:pk>/update/",
        UpdateProductView.as_view(),
        name="update-product",
    ),

    path(
        "<int:pk>/delete/",
        DeleteProductView.as_view(),
        name="delete-product",
    ),
    
    path(
    "store/<int:store_id>/",
    StoreProductsView.as_view(),
    name="store-products",
    ),
]