from django.db import models
from django.db import models
from django.conf import settings

from products.models import Product
# Create your models here.
class OrderStatus(models.TextChoices):

    PENDING = "PENDING", "Pending"

    CONFIRMED = "CONFIRMED", "Confirmed"

    PROCESSING = "PROCESSING", "Processing"

    SHIPPED = "SHIPPED", "Shipped"

    DELIVERED = "DELIVERED", "Delivered"

    CANCELLED = "CANCELLED", "Cancelled"
    
    
class Order(models.Model):

    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="orders",
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="orders",
    )

    quantity = models.PositiveIntegerField(
        default=1,
    )

    unit_price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
    )

    total_price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
    )

    status = models.CharField(
        max_length=20,
        choices=OrderStatus.choices,
        default=OrderStatus.PENDING,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return (
            f"Order #{self.id}"
        )