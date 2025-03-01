import json
import os
import re
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import logging
from difflib import SequenceMatcher

# Logging Setup
logging.basicConfig(level=logging.DEBUG)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
AADHAAR_PATH = os.path.join(BASE_DIR, 'backend', 'api', 'data', 'aadhar_data.json')
PAN_PATH = os.path.join(BASE_DIR, 'backend', 'api', 'data', 'pan_data.json')

def load_json(file_path):
    if os.path.exists(file_path):
        with open(file_path, 'r') as file:
            return json.load(file)
    logging.error(f"File Not Found ❌: {file_path}")
    return []

aadhaar_data = load_json(AADHAAR_PATH)
pan_data = load_json(PAN_PATH)

def calculate_similarity(str1, str2):
    return SequenceMatcher(None, str1.lower(), str2.lower()).ratio()

def validate_pan(pan):
    pan_regex = r"^[A-Z]{5}[0-9]{4}[A-Z]$"
    return re.match(pan_regex, pan) is not None

@csrf_exempt
def verify_details(request):
    if request.method == "POST":
        try:
            payload = json.loads(request.body)
            name = payload.get("name", "")
            dob = payload.get("dob", "")
            phone_number = payload.get("phone_number", "")
            aadhaar_number = payload.get("aadhaar_number", "")
            pan_number = payload.get("pan_number", "")

            logging.debug(f"Payload: {payload}")

            if pan_number and not validate_pan(pan_number):
                return JsonResponse({
                    "status": "failed",
                    "message": "Invalid PAN Number Format ❌"
                })

            aadhaar_match = False
            pan_match = False
            aadhaar_matched_fields = []
            pan_matched_fields = []
            aadhaar_score = 0
            pan_score = 0

            # Aadhaar Verification
            for person in aadhaar_data:
                if calculate_similarity(person.get("name", ""), name) > 0.8:
                    aadhaar_matched_fields.append("name")
                    aadhaar_score += 1
                if person.get("dob") == dob:
                    aadhaar_matched_fields.append("dob")
                    aadhaar_score += 1
                if person.get("phone_number") == phone_number:
                    aadhaar_matched_fields.append("phone_number")
                    aadhaar_score += 1

                if len(aadhaar_matched_fields) >= 2:
                    aadhaar_match = True
                    break

            # PAN Verification
            for person in pan_data:
                if calculate_similarity(person.get("name", ""), name) > 0.8:
                    pan_matched_fields.append("name")
                    pan_score += 1
                if person.get("dob") == dob:
                    pan_matched_fields.append("dob")
                    pan_score += 1
                if person.get("pan_number") == pan_number:
                    pan_matched_fields.append("pan_number")
                    pan_score += 1

                if len(pan_matched_fields) >= 2:
                    pan_match = True
                    break

            aadhaar_percentage = (aadhaar_score / 3) * 100
            pan_percentage = (pan_score / 3) * 100

            response = {
                "aadhaar_verified": aadhaar_match,
                "aadhaar_similarity_percentage": round(aadhaar_percentage, 2),
                "aadhaar_matched_fields": aadhaar_matched_fields,
                "pan_verified": pan_match,
                "pan_similarity_percentage": round(pan_percentage, 2),
                "pan_matched_fields": pan_matched_fields,
                "status": "partial",
                "message": "Partial Verification 🔥",
            }

            if aadhaar_match and pan_match:
                response["status"] = "success"
                response["message"] = "Details Fully Verified ✅"
            elif aadhaar_match and not pan_match:
                response["message"] = "Aadhaar Verified ✅ but PAN Mismatch ❌"
            elif pan_match and not aadhaar_match:
                response["message"] = "PAN Verified ✅ but Aadhaar Mismatch ❌"
            else:
                response["status"] = "failed"
                response["message"] = "Details Mismatch ❌"

            return JsonResponse(response)

        except json.JSONDecodeError:
            logging.error("Invalid JSON Payload")
            return JsonResponse({"status": "error", "message": "Invalid JSON Payload"})

    return JsonResponse({"status": "error", "message": "Invalid Request Method"})
