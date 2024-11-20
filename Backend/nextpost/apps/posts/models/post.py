from django.db import models
from apps.user.models import User

from django.core.validators import MaxValueValidator, MinValueValidator

POST_TYPE_CHOICES = (
    ('Historia', 'Historia'),
    ('Logro', 'Logro'),
    ('Opnion de liderazgo', 'Opnion de liderazgo'),
    ('Pregunta', 'Pregunta'),
    ('Recomendacion', 'Recomendacion'),
    ('Reflexion', 'Reflexion'),
    ('Solicitud de ayuda', 'Solicitud de ayuda'),
    ('Sugerencia', 'Sugerencia'),
)

TONO_CHOICES = (
    ('Amistoso', 'Amistoso'),
    ('Profesional', 'Profesional'),
    ('Asertivo', 'Asertivo'),
    ('Autoritario', 'Autoritario'),
    ('Convincente', 'Convincente'),
    ('Desafiante', 'Desafiante'),
    ('Empatico', 'Empatico'),
    ('Inspirador', 'Inspirador'),
    ('Motivador', 'Motivador'),
    ('Optimista', 'Optimista'),
    ('Respetuoso', 'Respetuoso'),
    ('Serio', 'Serio'),
    ('Urgente', 'Urgente'),
)

RED_SOCIAL_CHOICES = (
    ('Facebook', 'Facebook'),
    ('Instagram', 'Instagram'),
    ('LinkedIn', 'LinkedIn'),
    ('Twitter', 'Twitter'),
    ('WhatsApp', 'WhatsApp'),
)


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    idea = models.CharField(max_length=255)
    creatividad = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    tema = models.CharField(max_length=255)
    post_type = models.CharField(max_length=255, choices=POST_TYPE_CHOICES)
    pensamientos = models.TextField()
    ejemplo = models.TextField()
    tono = models.CharField(max_length=255)
    size = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(500)])
    red_social = models.CharField(max_length=255, choices=RED_SOCIAL_CHOICES)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    post_generado = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.idea
