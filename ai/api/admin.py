from django.contrib import admin

from .models import ImageForecasting


class ImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'image')


admin.site.register(ImageForecasting, ImageAdmin)
