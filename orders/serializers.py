from rest_framework import serializers

from .models import Order


class OrderSerializer(
    serializers.ModelSerializer
):

    product_name = serializers.ReadOnlyField(
        source="product.name"
    )

    store_name = serializers.ReadOnlyField(
        source="product.store.name"
    )

    class Meta:
        model = Order

        fields = (
            "id",
            "customer",
            "product",
            "product_name",
            "store_name",
            "quantity",
            "unit_price",
            "total_price",
            "status",
            "created_at",
        )

        read_only_fields = (
            "customer",
            "product_name",
            "store_name",
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