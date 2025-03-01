from rest_framework import viewsets
from rest_framework.response import Response
from .models import LandRecord
from .serializers import LandRecordSerializer
from blockchain.blockchain import Blockchain
from rest_framework.decorators import action

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

    # def list(self, request):
    #     records = self.queryset
    #     serializer = LandRecordSerializer(records, many=True)
    #     return Response({
    #         "database": serializer.data,
    #         "blockchain": blockchain.get_all_blocks()
    #     })

    def retrieve(self, request, pk=None):
        try:
            record = LandRecord.objects.get(pk=pk)
            serializer = LandRecordSerializer(record)
            return Response(serializer.data)
        except LandRecord.DoesNotExist:
            return Response({"error": "Record Not Found"}, status=404)

    # @action(detail=False, methods=['get'])
    # def verify(self, request):
    #     is_valid = blockchain.verify_chain()
    #     return Response({"verified": is_valid}, status=200)

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



