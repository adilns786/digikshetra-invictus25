from django.urls import path
from .views import verify_details

urlpatterns = [
    path('verify/', verify_details, name='verify_details')
]
