from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LandRecordViewSet

router = DefaultRouter()
router.register(r'records', LandRecordViewSet, basename='landrecord')

urlpatterns = [
    path('', include(router.urls)),
    path('records/verify/', LandRecordViewSet.as_view({'get': 'verify'})),  
]
