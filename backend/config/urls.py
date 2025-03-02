from django.contrib import admin
from django.urls import path, include
from django.conf import settings  # ✅ Import settings
from django.conf.urls.static import static  # ✅ Import static to serve media files

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('landrecords.urls')),
    path('api-auth/', include('api.urls')),
]

# ✅ Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
