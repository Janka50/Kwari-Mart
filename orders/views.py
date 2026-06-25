from django.shortcuts import render
from decimal import Decimal

from django.shortcuts import get_object_or_404

from rest_framework import generics
from rest_framework.permissions import (
    IsAuthenticated,
)

from accounts.models import UserRole

from products.models import Product

from .models import Order
from .serializers import OrderSerializer
from rest_framework import serializers
# Create your views here.

class CreateOrderView(
    generics.CreateAPIView
):

    serializer_class = OrderSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def perform_create(
        self,
        serializer
    ):

        product_id = (
            self.request.data.get(
                "product"
            )
        )

        quantity = int(
            self.request.data.get(
                "quantity",
                1
            )
        )

        product = get_object_or_404(
            Product,
            pk=product_id,
            is_active=True,
        )

        total_price = (
            product.price * quantity
        )
        if (
            self.request.user.role
            != UserRole.CUSTOMER
       ):
            raise PermissionError(
             "Only customers can place orders."
      )     
        if quantity > product.stock_quantity:
               raise serializers.ValidationError(
               "Insufficient stock available."
    )

               product.stock_quantity -= quantity
               product.save()
        serializer.save(
            customer=self.request.user,
            product=product,
            unit_price=product.price,
            total_price=total_price,
        )
        
class MyOrdersView(
    generics.ListAPIView
):

    serializer_class = OrderSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(self):

       if getattr(self, "swagger_fake_view", False):
           return Order.objects.none()

       return Order.objects.filter(
           customer=self.request.user
    )
        
class MerchantOrdersView(
    generics.ListAPIView
):

    serializer_class = OrderSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(self):

        if getattr(self, "swagger_fake_view", False):
            return Order.objects.none()

        return Order.objects.filter(
            product__store__owner=self.request.user
    )
class UpdateOrderStatusView(
    generics.RetrieveUpdateAPIView
):

    serializer_class = OrderSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(self):

        return Order.objects.filter(
            product__store__owner=self.request.user
        )