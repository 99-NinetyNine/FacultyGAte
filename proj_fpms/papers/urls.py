from django.urls import path
from rest_framework import routers
from .api import PaperViewSet, SearchView, SearchViewAuthors, SearchViewTitle,SearchAnyField

router = routers.DefaultRouter()
router.register('api/papers', PaperViewSet, 'papers')

urlpatterns = router.urls
urlpatterns += [path('api/search/<slug:slug>/', SearchView.as_view())]
urlpatterns += [path('api/search/authors/<slug:slug>/', SearchViewAuthors.as_view())]
urlpatterns += [path('api/search/title/<slug:slug>/', SearchViewTitle.as_view())]
urlpatterns += [path('api/search/any/<slug:slug>/', SearchAnyField.as_view())]
