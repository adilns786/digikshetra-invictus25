# views.py - Use Redis to handle ledger data
import redis
import json
import datetime
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

# Configure Redis connection
redis_client = redis.StrictRedis(
    host="redis-12407.crce182.ap-south-1-1.ec2.redns.redis-cloud.com",  
    port=12407,  
    username="default",
    password="aWHHBWiwKtcPFSx5ECSgsmxUFG164av9",  
    decode_responses=True
)

@csrf_exempt
def create_genesis_block(request):
    if request.method == 'POST':
        try:
            # Parse the incoming JSON data
            data = json.loads(request.body)
            
            dlid = data.get('dlid')
            area = data.get('area')
            owner_name = data.get('owner_name')
            landmark = data.get('landmark')
            property_type = data.get('property_type')
            price = data.get('price')
            
            if not dlid or not area or not owner_name or not landmark or not property_type or not price:
                return JsonResponse({'error': 'Missing required fields'}, status=400)

            # Check if the ledger already exists
            if redis_client.exists(f"ledger:{dlid}"):
                return JsonResponse({'error': 'Ledger already exists for this DLID'}, status=400)

            # Create the genesis block
            genesis_block = {
                "dlid": dlid,
                "area": area,
                "owner_name": owner_name,
                "landmark": landmark,
                "property_type": property_type,
                "price": price,
                "timestamp": str(datetime.datetime.now())
            }

            # Store the genesis block in Redis
            redis_client.set(f"ledger:{dlid}", json.dumps([genesis_block]))

            return JsonResponse({'message': 'Genesis block created successfully'}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def add_transaction(request):
    if request.method == 'POST':
        try:
            # Parse the incoming JSON data
            data = json.loads(request.body)
            
            dlid = data.get('dlid')
            sender = data.get('sender')
            receiver = data.get('receiver')
            amount = data.get('amount')
            
            if not dlid or not sender or not receiver or not amount:
                return JsonResponse({'error': 'Missing required fields'}, status=400)

            # Check if ledger exists for this dlid
            if not redis_client.exists(f"ledger:{dlid}"):
                return JsonResponse({'error': 'Ledger does not exist for this DLID'}, status=404)

            # Retrieve the current ledger from Redis
            ledger = json.loads(redis_client.get(f"ledger:{dlid}"))
            
            # Create the transaction block
            transaction_block = {
                "seller": sender,
                "buyer": receiver,
                "amount": amount,
                "timestamp": str(datetime.datetime.now())
            }

            # Add the transaction to the ledger
            ledger.append(transaction_block)

            # Store the updated ledger in Redis
            redis_client.set(f"ledger:{dlid}", json.dumps(ledger))

            return JsonResponse({'message': 'Transaction added successfully'}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def get_blockchain(request):
    if request.method == 'GET':
        # Retrieve all the ledgers stored in Redis
        keys = redis_client.keys("ledger:*")
        blockchain_data = []

        for key in keys:
            ledger = redis_client.get(key)
            if ledger:
                blockchain_data.append(json.loads(ledger))

        return JsonResponse({'blockchain': blockchain_data}, status=200)

    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def get_ledger_by_dlid(request, dlid):
    try:
        ledger = redis_client.get(f"ledger:{dlid}")
        if not ledger:
            return JsonResponse({'error': 'Ledger not found'}, status=404)
        return JsonResponse({'ledger': json.loads(ledger)}, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
@csrf_exempt
def clear_blockchain(request):
    try:
        # Clear all keys in the Redis store for blockchain
        redis_client.flushdb()  # This deletes all keys from the database
        
        return JsonResponse({'message': 'Blockchain cleared successfully.'}, status=200)
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)