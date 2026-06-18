from django.shortcuts import render


from django.shortcuts import get_object_or_404

from rest_framework import generics
from rest_framework.permissions import (
    IsAuthenticated,
)

from accounts.permissions import (
    IsMerchant,
)

from stores.models import Store

from .models import Product
from .serializers import ProductSerializer
from django.db.models import Q
# Create your views here.

class CreateProductView(
    generics.CreateAPIView
):

    serializer_class = ProductSerializer

    permission_classes = [
        IsAuthenticated,
        IsMerchant,
    ]

    def perform_create(
        self,
        serializer
    ):

        store = get_object_or_404(
            Store,
            owner=self.request.user
        )

        serializer.save(
            store=store
        )
        
class MyProductsView(
    generics.ListAPIView
):

    serializer_class = ProductSerializer

    permission_classes = [
        IsAuthenticated,
        IsMerchant,
    ]

    def get_queryset(self):

        if getattr(self, "swagger_fake_view", False):
            return Product.objects.none()

        store = get_object_or_404(
            Store,
            owner=self.request.user
        )

        return Product.objects.filter(
            store=store
        )
        
class UpdateProductView(
    generics.RetrieveUpdateAPIView
):

    serializer_class = ProductSerializer

    permission_classes = [
        IsAuthenticated,
        IsMerchant,
    ]

    def get_queryset(self):

        store = get_object_or_404(
            Store,
            owner=self.request.user
        )

        return Product.objects.filter(
            store=store
        )
        
class DeleteProductView(
    generics.DestroyAPIView
):

    serializer_class = ProductSerializer

    permission_classes = [
        IsAuthenticated,
        IsMerchant,
    ]

    def get_queryset(self):

        store = get_object_or_404(
            Store,
            owner=self.request.user
        )

        return Product.objects.filter(
            store=store
        )
        
class ProductListView(
    generics.ListAPIView
):

    serializer_class = ProductSerializer

    def get_queryset(self):

        queryset = Product.objects.filter(
            is_active=True
        )

        search = self.request.GET.get(
            "search"
        )

        min_price = self.request.GET.get(
        "min_price"
)

        max_price = self.request.GET.get(
        "max_price"
)

        if min_price:
            queryset = queryset.filter(
                price__gte=min_price
    )

        if max_price:
            queryset = queryset.filter(
              price__lte=max_price
    )
        ordering = self.request.GET.get(
        "ordering"
)

        if ordering:
           queryset = queryset.order_by(
               ordering
    )
        return queryset


class ProductDetailView(
    generics.RetrieveAPIView
):

    queryset = Product.objects.filter(
        is_active=True
    )

    serializer_class = ProductSerializer
    
class StoreProductsView(
    generics.ListAPIView
):

    serializer_class = ProductSerializer

    def get_queryset(self):

        store_id = self.kwargs.get(
        "store_id"
    )

        if not store_id:
            return Product.objects.none()

        return Product.objects.filter(
            store_id=store_id,
            is_active=True
    )