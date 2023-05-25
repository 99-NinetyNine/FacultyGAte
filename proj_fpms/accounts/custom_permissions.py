
from rest_framework.permissions import BasePermission, SAFE_METHODS


class isTheSameUser(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.id == obj.id


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS
