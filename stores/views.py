from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers
from accounts.permissions import IsMerchant
from django.shortcuts import get_object_or_404

from .models import Store
from .serializers import StoreSerializer

# Create your views here.

class CreateStoreView(generics.CreateAPIView):
    serializer_class = StoreSerializer

    permission_classes = [
        IsAuthenticated,
        IsMerchant,
    ]

    def perform_create(self, serializer):

        if Store.objects.filter(
            owner=self.request.user
        ).exists():

            raise serializers.ValidationError(
                "You already own a store."
            )

        serializer.save(
            owner=self.request.user
        )


class UpdateStoreView(
    generics.RetrieveUpdateAPIView
):

    serializer_class = StoreSerializer

    permission_classes = [
        IsAuthenticated,
        IsMerchant,
    ]

    def get_object(self):
        
       return get_object_or_404(
           Store,
           owner=self.request.user
    )
       
       
class StoreListView(
    generics.ListAPIView
):

    queryset = Store.objects.all()

    serializer_class = StoreSerializer
    
class StoreDetailView(
    generics.RetrieveAPIView
):

    queryset = Store.objects.all()

    serializer_class = StoreSerializer