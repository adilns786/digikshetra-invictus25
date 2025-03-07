from .base import *  # Import base settings

DEBUG = False  # Disable debug mode for production

ALLOWED_HOSTS = ["yourdomain.com", "www.yourdomain.com"]

# Use a secure secret key
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "your-production-secret-key")

# Secure database settings
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv("DB_NAME", "yourdbname"),
        'USER': os.getenv("DB_USER", "yourdbuser"),
        'PASSWORD': os.getenv("DB_PASSWORD", "yourdbpassword"),
        'HOST': os.getenv("DB_HOST", "yourdbhost"),
        'PORT': os.getenv("DB_PORT", "5432"),
    }
}

# Security settings
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
X_FRAME_OPTIONS = "DENY"

# Static and media files
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Logging for production
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': os.path.join(BASE_DIR, 'logs', 'django_errors.log'),
        },
    },
    'root': {
        'handlers': ['file'],
        'level': 'ERROR',
    },
}
