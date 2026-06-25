from django.contrib import admin
from .models import Order
# Register your models here.




@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "customer",
        "product",
        "quantity",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
    )