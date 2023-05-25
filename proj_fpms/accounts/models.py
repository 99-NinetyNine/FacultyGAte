from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
import PIL
from PIL import Image


class User(AbstractUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    registerToken = models.CharField(max_length=255, null=True)
    otp = models.CharField(max_length = 255, null =True)


# User._meta.get_field('email').null = False
# User._meta.get_field('email').blank = False

# Create your models here.
class Profile(models.Model):
    full_name = models.CharField(max_length=200, null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    image = models.ImageField(_("Image"), default='default.jpg',
                              upload_to='profile_pics', blank=True)
    about_me = models.CharField(max_length=200, null=True)
    institute = models.CharField(max_length=200, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return f"{self.full_name} Profile"

    # def save(self):
    #     super(Profile,).save()

    #     img = Image.open(self.image.path)
    #     if img.height > 300 or img.width > 300:
    #         output_size = (300, 300)
    #         img.thumbnail(output_size)
    #         img.save(self.image.path)
