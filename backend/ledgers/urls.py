from django.urls import path
from .views import create_genesis_block, add_transaction, get_blockchain

urlpatterns = [
    path('create/', create_genesis_block, name='create_genesis_block'),
    path('add_transaction/', add_transaction, name='add_transaction'),
    path('blockchain/', get_blockchain, name='get_blockchain'),
]
