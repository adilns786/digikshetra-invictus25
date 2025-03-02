import os
import json
from uuid import uuid4
from django.conf import settings
from django.http import JsonResponse
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from .models import LandRecord
from .serializers import LandRecordSerializer
from blockchain.blockchain import Blockchain
from .predict import predict_fraud
import pandas as pd

blockchain = Blockchain()  # Global Blockchain Instance

class LandRecordViewSet(viewsets.ModelViewSet):
    queryset = LandRecord.objects.all()
    serializer_class = LandRecordSerializer

    def create(self, request):
        serializer = LandRecordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            blockchain.add_block(serializer.data)  # Adding to Blockchain
            return Response({
                "message": "Record Added",
                "data": serializer.data
            }, status=201)
        return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        try:
            record = LandRecord.objects.get(pk=pk)
            serializer = LandRecordSerializer(record)
            return Response(serializer.data)
        except LandRecord.DoesNotExist:
            return Response({"error": "Record Not Found"}, status=404)

    def list(self, request):
        blocks = blockchain.get_all_blocks()
        return Response({
            "blockchain": blocks
        }, status=200)

    @action(detail=False, methods=['get'])
    def verify(self, request):
        is_valid = blockchain.verify_chain()
        return Response({
            "message": "Blockchain Integrity Check",
            "verified": is_valid
        }, status=200)
    
    @action(detail=False, methods=['delete'])
    def clear(self, request):
        LandRecord.objects.all().delete()
        self.rebuild_genesis()
        return Response({"message": "Database and Blockchain cleared successfully"}, status=200)
    
    def rebuild_genesis(self):
        global blockchain
        blockchain = Blockchain()

    @action(detail=False, methods=['post'], parser_classes=[MultiPartParser, FormParser])
    def upload_media(self, request):
        """
        Handle file uploads for photos, videos, and documents.
        Supports multiple files and categorizes them by type.
        """
        try:
            upload_type = request.data.get('type')
            if not upload_type:
                return Response({"error": "Upload type is required"}, status=status.HTTP_400_BAD_REQUEST)
    
            allowed_types = ['documents', 'property-images']
            if upload_type not in allowed_types:
                return Response({"error": f"Invalid upload type: {upload_type}"}, status=status.HTTP_400_BAD_REQUEST)
    
            uploaded_files = request.FILES.getlist('files')
            if not uploaded_files:
                return Response({"error": "No files provided"}, status=status.HTTP_400_BAD_REQUEST)
    
            if upload_type == 'documents':
                allowed_mime_types = ['application/pdf', 'image/jpeg', 'image/png']
                max_file_size = 10 * 1024 * 1024  # 10MB limit for documents
            elif upload_type == 'property-images':
                allowed_mime_types = ['image/jpeg', 'image/png']
                max_file_size = 50 * 1024 * 1024  # 50MB limit for property images
    
            media_dir = os.path.join(settings.MEDIA_ROOT, 'uploads', upload_type)
            os.makedirs(media_dir, exist_ok=True)
    
            uploaded_file_urls = []
    
            for uploaded_file in uploaded_files:
                if uploaded_file.content_type not in allowed_mime_types:
                    return Response(
                        {"error": f"Unsupported file type for {upload_type}: {uploaded_file.content_type}"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
    
                if uploaded_file.size > max_file_size:
                    return Response(
                        {"error": f"File size exceeds limit for {upload_type}: {uploaded_file.name}"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
    
                file_extension = os.path.splitext(uploaded_file.name)[1]
                unique_filename = f"{uuid4()}{file_extension}"
    
                file_path = os.path.join(media_dir, unique_filename)
                with open(file_path, 'wb+') as destination:
                    for chunk in uploaded_file.chunks():
                        destination.write(chunk)
    
                file_url = f"{settings.MEDIA_URL}uploads/{upload_type}/{unique_filename}"
                uploaded_file_urls.append({
                    "fileName": unique_filename,
                    "fileUrl": file_url,
                    "fileSize": uploaded_file.size,
                    "fileType": uploaded_file.content_type
                })
    
            return Response({
                "message": "Files uploaded successfully",
                "files": uploaded_file_urls
            }, status=status.HTTP_201_CREATED)
    
        except Exception as e:
            return Response({
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['post'])
    def predict_fraud(self, request):
        """
        Handle fraud prediction requests.
        """
        try:
            # Parse incoming JSON data
            input_data = json.loads(request.body)

            # Map incoming data to the required structure
            transaction_data = {
                'transaction_id': ['TR999'],  # Default value
                'timestamp': [input_data.get('timestamp', '2024-12-20 10:15:00')],  # Default value
                'property_id': [input_data.get('property_id', 'P2050')],  # Default value
                'seller_id': [input_data.get('seller_id', 'S125')],  # Default value
                'buyer_id': [input_data.get('buyer_id', 'B210')],  # Default value
                'property_type': [input_data.get('propertyType', 'residential')],  # Map propertyType
                'area_sqft': [input_data.get('area', 0)],  # Map area
                'listed_price': [input_data.get('price', 0)],  # Map price
                'transaction_price': [input_data.get('price', 0)],  # Default to listed price
                'price_per_sqft': [round(input_data.get('price', 0) / input_data.get('area', 1), 2)],  # Calculate
                'location': [input_data.get('location', 'Unknown')],  # Map location
                'coordinates': [input_data.get('coordinates', '0,0')],  # Map coordinates
                'title_age_days': [input_data.get('title_age_days', 0)],  # Default value
                'amenities': [input_data.get('amenities', '')],  # Map amenities
                'nearby_landmarks': [input_data.get('nearbyLandmarks', '')],  # Map nearbyLandmarks
                'ownership_changes_count': [input_data.get('ownershipHistory', 0)],  # Map ownershipHistory
                'days_on_market': [input_data.get('days_on_market', 30)],  # Default value
                'has_extract7_12': [input_data.get('has_extract7_12', False)],  # Default value
                'has_mutation_certificate': [input_data.get('has_mutation_certificate', False)],  # Default value
                'has_property_tax_receipt': [input_data.get('has_property_tax_receipt', False)],  # Default value
                'has_sale_deed': [input_data.get('has_sale_deed', False)],  # Default value
                'legal_compliance_complete': [input_data.get('legalCompliance', False)],  # Map legalCompliance
                'price_change_percent': [input_data.get('price_change_percent', 0)],  # Default value
                'buyer_seller_relation': [input_data.get('buyer_seller_relation', 'unrelated')],  # Default value
                'agent_involved': [input_data.get('agent_involved', False)],  # Default value
                'transaction_speed_days': [input_data.get('transaction_speed_days', 30)],  # Default value
                'multiple_transaction_30days': [input_data.get('multiple_transaction_30days', False)],  # Default value
                'seller_previous_fraud': [input_data.get('seller_previous_fraud', False)]  # Default value
            }

            # Convert to DataFrame
            transaction_df = pd.DataFrame(transaction_data)

            # Call the fraud prediction function
            prediction = predict_fraud(transaction_df)

            # Return the prediction
            return Response({"is_fraud": prediction}, status=200)

        except Exception as e:
            # Handle all errors
            return Response({"error": str(e)}, status=400)