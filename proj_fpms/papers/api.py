from .custom_permissions import isOwnerOrReadOnly
from rest_framework import viewsets, permissions
from .models import Paper
from .serializers import PaperSerializer

from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework import filters
from accounts.models import User
from rest_framework import generics


class PaperViewSet(viewsets.ModelViewSet):
    queryset = Paper.objects.all()
    #permission_classes = [permissions.IsAuthenticated and isOwnerOrReadOnly]
    permission_classes = [permissions.AllowAny]

    serializer_class = PaperSerializer
    ordering = ['-publication_date']

    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'author__profile__full_name','authors','group']
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True)
    def get_user_posts(self, request, pk=None):
        owner = get_object_or_404(User, pk=pk)
        if(owner == self.request.user):
            owner_paper = Paper.objects.filter(
                author=owner.id)
        else:
            owner_paper = Paper.objects.filter(
                author=owner.id, status='published')
        serializer = PaperSerializer(owner_paper, many=True)
        return Response(serializer.data)


class SearchView(generics.ListAPIView):
    queryset = Paper.postobjects.all()
    serializer_class = PaperSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'author__profile__full_name','authors', 'group']
    ordering = ['-publication_date']


class SearchViewTitle(generics.ListAPIView):
    queryset = Paper.postobjects.all()
    serializer_class = PaperSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title']
    ordering = ['-publication_date']

class SearchViewAuthors(generics.ListAPIView):
    queryset = Paper.postobjects.all()
    serializer_class = PaperSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['author__profile__full_name',"authors"]
    ordering = ['-publication_date']

"""
added features by 2076 batch(sir suggestion)
"""
class SearchAnyField(generics.ListAPIView):
    """
    Author name, title, DOI, ISSN or any field is searched.
    if search criteria(checkbox such as title|| author etc) is not given.
    """
    serializer_class = PaperSerializer
    
    def get_queryset(self):
        queryset = Purchase.objects.all()
        lookup_value = self.request.query_params.get('search')
        
        if(lookup_value is not None):
            user_=User.objects.get(username=lookup_value)
            qs_author = queryset.filter(author=user_)if user_ else None
            qs_title = queryset.filter(title=lookup_value)
            qs_issn = queryset.filter(issn=lookup_value)
            qs_doi = queryset.filter(DOI=lookup_value)

            return qs_author.union(qs_title, qs_issn,qs_doi, all=True)
