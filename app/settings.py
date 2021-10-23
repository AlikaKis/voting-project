"""
Django settings for project project.

Generated by 'django-admin startproject' using Django 3.2.8.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""
import os
from pathlib import Path
from environs import Env

env = Env()
# Read .env into os.environ
env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env.str("SECRET_KEY")
ACCESS_TOKEN_TIME_IN_MINUTES = env.int("ACCESS_TOKEN_TIME_IN_MINUTES")
REFRESH_TOKEN_TIME_IN_DAYS = env.int("REFRESH_TOKEN_TIME_IN_DAYS")
DOMAIN = env.str("DOMAIN")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool("DEBUG")

ALLOWED_HOSTS = [DOMAIN, ]

INSTALLED_APPS = [
    'baton',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    "corsheaders",
    'drf_yasg',
    'api',
    'baton.autodiscover',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = (
    'http://127.0.0.1:3000',
)

CORS_ALLOWED_ORIGINS = ['http://127.0.0.1:3000', ]

ROOT_URLCONF = 'app.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'app.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'ru-ru'

TIME_ZONE = 'Europe/Moscow'

USE_I18N = True

USE_L10N = True

USE_TZ = True

AUTH_USER_MODEL = 'api.User'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'api.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',  # make all endpoints private
    )
}


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/


STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Vue project location
FRONTEND_DIR = os.path.join(BASE_DIR, 'client')

# Vue assets directory (assetsDir)
STATICFILES_DIRS = [
    os.path.join(FRONTEND_DIR, 'build/static'),
]

# Webpack output location containing index.html file (outputDir)
TEMPLATES[0]['DIRS'] += [
    os.path.join(FRONTEND_DIR, 'build'),
]

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


BATON = {
    'SITE_HEADER': 'Выборы',
    'SITE_TITLE': 'Выборы мэра Москвы',
    'INDEX_TITLE': 'Панель администратора выборов мэра Москвы',
    'SUPPORT_HREF': 'https://github.com/Phoenix-Education-Project/team9repo',
    'COPYRIGHT': 'Copyright © 2021 НЕО-А4',
    'POWERED_BY': 'НЕО-А4',
    'MENU_TITLE': 'Меню',
    'GRAVATAR_DEFAULT_IMG': 'mp',

    'CHANGELIST_FILTERS_IN_MODAL': True,
    'CHANGELIST_FILTERS_ALWAYS_OPEN': True,

    'MENU': (
        {'type': 'title', 'label': 'Пользователи', 'apps': ('api', )},
        {'type': 'model', 'label': 'Аккаунты', 'name': 'user', 'app': 'api'},
        {'type': 'model', 'label': 'Токены', 'name': 'refreshtokens', 'app': 'api'},

        {'type': 'title', 'label': 'Голосование', 'apps': ('api', )},
        {'type': 'model', 'label': 'Участки', 'name': 'votingarea', 'app': 'api'},
        {'type': 'model', 'label': 'Партии', 'name': 'consigment', 'app': 'api'},
        {'type': 'model', 'label': 'Кандидаты', 'name': 'candidate', 'app': 'api'},

        {'type': 'title', 'label': 'Результаты', 'apps': ('api', )},
        {'type': 'model', 'label': 'Протоколы', 'name': 'protocol', 'app': 'api'},
        {'type': 'model', 'label': 'Результаты', 'name': 'result', 'app': 'api'},
    ),
}
