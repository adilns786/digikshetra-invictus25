from django.urls import path
from . import views

urlpatterns = [
    path('create-genesis/', views.create_genesis_block, name='create_genesis_block'),
    path('add-transaction/', views.add_transaction, name='add_transaction'),
    path('blockchain/', views.get_blockchain, name='get_blockchain'),
    path('get-ledger/<str:dlid>/', views.get_ledger_by_dlid, name='get_ledger_by_dlid'),
    path('clear-blockchain/', views.clear_blockchain, name='clear_blockchain')
]
