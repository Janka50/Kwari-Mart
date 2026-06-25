from rest_framework import serializers

from .models import Order


class OrderSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = Order

        fields = "__all__"

        read_only_fields = (
            "customer",
            "unit_price",
            "total_price",
            "status",
        )
        
class OrderStatusSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = Order

        fields = [
            "status"
        ]