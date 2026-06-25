from django.contrib import admin
from .models import Store
# Register your models here.





@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "owner",
        "is_verified",
        "created_at",
    )