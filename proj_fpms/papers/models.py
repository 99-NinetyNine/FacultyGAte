from django.db import models
from accounts.models import User
from django.utils import timezone

# Create your models here.


class Paper(models.Model):

    options = (("draft", "Draft"), ("published", "Published"))

    class PostPapers(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')

    category = (("journal", "Journal"),
                ("publication", "Publication"),
                ("book", "Book"),
                ("conference_article", "Conference Article"),
                ("report", "Report"),
                ("misc_paper", "Miscellaneous Papers"))

    levels = (("","None"),("national", "National"), ("international", "International"))
    author_levels =(("", "None"),("chief","Chief"),("correspondence","Correspondence"),("co-author","Co-Author"))
   
    title = models.CharField(max_length=250)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)
    publication_date = models.DateField(null=True, blank=True)
    publisher = models.CharField(max_length=50, null=True, blank=True)
    paper_link = models.CharField(max_length=250, null=True, blank=True)
    status = models.CharField(max_length=10, choices=options)
    group = models.CharField(max_length=20, choices=category)
    level = models.CharField(max_length=20, null =True, choices = levels, default = "national" )
    description = models.CharField(max_length=1000, null=True, blank=True)
    authors = models.CharField(max_length=250, null=True, blank=True)
    author_status = models.CharField(max_length =20, null = True, choices = author_levels, default ="chief")
    # journals-specificCh

    journal = models.CharField(max_length=250, null = True, blank = True)
    volume = models.CharField(max_length=50, null=True, blank=True)
    peer_reviewed = models.CharField(max_length=50, null=True, blank=True)
    issn = models.CharField(max_length=50, null=True, blank=True)
    issue = models.CharField(max_length=50, null=True, blank=True)
    pages = models.CharField(max_length=50, null=True, blank=True)
    SJR_rating = models.DecimalField(max_digits=10, decimal_places=3, null = True, blank = True)
    impact_factor_journal = models.DecimalField(max_digits =10, decimal_places =3, null =True, blank = True)

    # publication-specific
    DOI = models.CharField(max_length=50, null=True, blank=True)

    # books-specific DOI and volume

    edition = models.CharField(max_length=50, null=True, blank=True)
    isbn = models.CharField(max_length=50, null=True, blank=True)
    chapters = models.CharField(max_length=50, null=True, blank=True)

    # conference_article-specific pages and issue
    conference_name = models.CharField(max_length=200, null=True, blank=True)
    location = models.CharField(max_length=50, null=True, blank=True)
    organised_date = models.DateField(
        null=True, blank=True, default=publication_date)

    class JournalPapers(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(category='journal')

    class ReportPapers(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(category='report')

    class BookPapers(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(category='book')

    class ArticlePapers(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(category='conference_article')

    class PublicationPapers(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(category='publication')

    class MiscPapers(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(category='misc_paper')

    objects = models.Manager()  # default manager
    postobjects = PostPapers()  # custom manager

    journalobjects = JournalPapers()
    bookobjects = BookPapers()
    reportobjects = ReportPapers()
    articleobjects = ArticlePapers()
    publicationobjects = PublicationPapers()
    miscobjects = MiscPapers()

    class Meta:
        ordering = ('-publication_date',)

    def __str__(self):
        return self.title
