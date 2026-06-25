from rest_framework import serializers

from .models import Store


class StoreSerializer(serializers.ModelSerializer):

    owner_email = serializers.ReadOnlyField(
        source="owner.email"
    )
    product_count = serializers.SerializerMethodField()
    class Meta:
        model = Store

        fields = (
            "id",
            "name",
            "description",
            "phone_number",
            "whatsapp_number",
            "logo",
            "is_verified",
            "owner_email",
            "created_at",
            "product_count",
        )

        read_only_fields = (
            "id",
            "is_verified",
            "owner_email",
            "created_at",
        )
    def get_product_count(
        self,
        obj
)     -> int:
        return obj.products.count()