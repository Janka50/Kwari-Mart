from django.db import models
from django.conf import settings

# Create your models here.



class Store(models.Model):
    
    class Meta:
        ordering = ["-created_at"]

    owner = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="store",
    )

    name = models.CharField(
        max_length=255,
        unique=True,
    )

    description = models.TextField(
        blank=True,
    )

    phone_number = models.CharField(
        max_length=20,
    )

    whatsapp_number = models.CharField(
        max_length=20,
        blank=True,
    )

    logo = models.ImageField(
        upload_to="stores/logos/",
        blank=True,
        null=True,
    )

    is_verified = models.BooleanField(
        default=False,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return self.name