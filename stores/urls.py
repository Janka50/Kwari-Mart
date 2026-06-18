from django.urls import path

from .views import (
    CreateStoreView,
    UpdateStoreView,
)
from .views import (
    CreateStoreView,
    UpdateStoreView,
    StoreListView,
    StoreDetailView,
)

urlpatterns = [

    path(
        "",
        CreateStoreView.as_view(),
        name="create-store",
    ),

    path(
        "me/",
        UpdateStoreView.as_view(),
        name="my-store",
    ),
    
     path(
        "",
        StoreListView.as_view(),
        name="store-list",
    ),

    path(
        "<int:pk>/",
        StoreDetailView.as_view(),
        name="store-detail",
    ),

]