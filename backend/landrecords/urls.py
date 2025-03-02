# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LandRecordViewSet # Import the new view

router = DefaultRouter()
router.register(r'records', LandRecordViewSet, basename='landrecord')

urlpatterns = [
    path('', include(router.urls)),
    path('records/verify/', LandRecordViewSet.as_view({'get': 'verify'})),
    path('upload/', LandRecordViewSet.as_view({'post': 'upload_media'})),  # New endpoint for file uploads
    # path('save-media/', save_media, name='save-media'),  # New endpoint for saving media URLs
    path('predict/', LandRecordViewSet.as_view({'post': 'predict_fraud'})),  # New endpoint for fraud prediction
]