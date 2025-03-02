import os
from uuid import uuid4
from django.conf import settings
from django.http import JsonResponse
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from .models import LandRecord
from .serializers import LandRecordSerializer
from blockchain.blockchain import Blockchain

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
            # Extract upload type from the request (e.g., 'documents', 'property-images')
            upload_type = request.data.get('type')
            if not upload_type:
                return Response({"error": "Upload type is required"}, status=status.HTTP_400_BAD_REQUEST)
    
            # Validate upload type
            allowed_types = ['documents', 'property-images']
            if upload_type not in allowed_types:
                return Response({"error": f"Invalid upload type: {upload_type}"}, status=status.HTTP_400_BAD_REQUEST)
    
            # Extract files from the request
            uploaded_files = request.FILES.getlist('files')
            if not uploaded_files:
                return Response({"error": "No files provided"}, status=status.HTTP_400_BAD_REQUEST)
    
            # Define allowed file types and size limits based on upload type
            if upload_type == 'documents':
                allowed_mime_types = ['application/pdf', 'image/jpeg', 'image/png']
                max_file_size = 10 * 1024 * 1024  # 10MB limit for documents
            elif upload_type == 'property-images':
                allowed_mime_types = ['image/jpeg', 'image/png']
                max_file_size = 50 * 1024 * 1024  # 50MB limit for property images
    
            # Create media directory for the upload type if it doesn't exist
            media_dir = os.path.join(settings.MEDIA_ROOT, 'uploads', upload_type)
            os.makedirs(media_dir, exist_ok=True)
    
            uploaded_file_urls = []
    
            for uploaded_file in uploaded_files:
                # Validate file type
                if uploaded_file.content_type not in allowed_mime_types:
                    return Response(
                        {"error": f"Unsupported file type for {upload_type}: {uploaded_file.content_type}"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
    
                # Validate file size
                if uploaded_file.size > max_file_size:
                    return Response(
                        {"error": f"File size exceeds limit for {upload_type}: {uploaded_file.name}"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
    
                # Generate a unique filename to prevent overwriting
                file_extension = os.path.splitext(uploaded_file.name)[1]
                unique_filename = f"{uuid4()}{file_extension}"
    
                # Save file to the filesystem
                file_path = os.path.join(media_dir, unique_filename)
                with open(file_path, 'wb+') as destination:
                    for chunk in uploaded_file.chunks():
                        destination.write(chunk)
    
                # Generate the URL for the file
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
# Add a separate view for saving multiple media files
@api_view(['POST'])
def save_media(request):
    """
    Save multiple media URLs that have been uploaded
    """
    try:
        photos = request.data.get('photos', [])
        videos = request.data.get('videos', [])
        
        # Here you might want to save these URLs to a model
        # For example, you could create a Media model and associate it with a LandRecord
        
        return Response({
            "message": "Media information saved successfully",
            "photos": photos,
            "videos": videos
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            "error": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
