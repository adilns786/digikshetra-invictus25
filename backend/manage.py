#!/usr/bin/env python
"""Flask command-line utility for running the server and administrative tasks."""
import os
import sys
from flask import Flask
from waitress import serve  # For production deployment

def create_app():
    """Create and configure the Flask application."""
    app = Flask(__name__)

    # Load configuration from environment variables or a config file
    app.config.from_object('config.settings')

    # Register blueprints, routes, and other components here
    @app.route('/')
    def home():
        return "Welcome to the Flask Server!"

    return app

def main():
    """Run administrative tasks or start the Flask server."""
    if len(sys.argv) > 1 and sys.argv[1] == 'runserver':
        # Run the Flask development server
        app = create_app()
        app.run(host='0.0.0.0', port=5000, debug=True)
    elif len(sys.argv) > 1 and sys.argv[1] == 'runprod':
        # Run the Flask production server using Waitress
        app = create_app()
        serve(app, host='0.0.0.0', port=5000)
    else:
        print("Usage:")
        print("  ./manage.py runserver  # Run the development server")
        print("  ./manage.py runprod    # Run the production server")

if __name__ == '__main__':
    main()