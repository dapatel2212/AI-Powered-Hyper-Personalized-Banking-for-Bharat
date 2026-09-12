"""
MongoDB connection helper. Single client, lazy init.
All app DB access goes through get_collection().
"""

from pymongo import MongoClient
from django.conf import settings

_client = None
_db = None


def get_client():
    global _client
    if _client is None:
        _client = MongoClient(settings.MONGODB_URI)
    return _client


def get_db():
    global _db
    if _db is None:
        _db = get_client()[settings.MONGODB_NAME]
    return _db


def get_collection(name):
    return get_db()[name]
