from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, login, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not login:
            raise ValueError('Users must have a login')

        email = self.normalize_email(email)
        email = str.lower(''.join(email))

        user = self.model(
            email=email,
            login=login,
        )
        user.userType = 'user'
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, login, password=None):
        user = self.create_user(
            email=email,
            password=password,
            login=login,
        )
        user.is_admin = True
        user.userType = 'admin'
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    ADMIN = 'admin'
    USER = 'user'
    EMPLOYEE = 'employee'
    USER_TYPE_CHOICES = (
        (ADMIN, 'Администратор'),
        (USER, 'Пользователь'),
        (EMPLOYEE, 'Сотрудник'),
    )

    email = models.EmailField(verbose_name="Email", max_length=60, unique=True)
    login = models.CharField(max_length=30, unique=True, verbose_name="Логин")
    date_joined = models.DateTimeField(
        auto_now_add=True, verbose_name="Зарегистрировался")
    last_login = models.DateTimeField(auto_now=True, verbose_name="Был в сети")
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    userType = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default=EMPLOYEE,
                                verbose_name="Тип пользователя")
    USERNAME_FIELD = 'login'
    REQUIRED_FIELDS = ['email', ]

    objects = UserManager()

    class Meta:
        verbose_name = "пользователь"
        verbose_name_plural = "пользователи"

    def __str__(self):
        return self.login

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self,):
        return self.is_admin


class RefreshTokens(models.Model):
    userId = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name="Пользователь", )
    refreshToken = models.CharField(
        max_length=255, verbose_name="Refresh токен",)
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name="Создан",)
    expiresIn = models.DateTimeField(
        verbose_name="Валиден до")

    class Meta:
        verbose_name = "токен"
        verbose_name_plural = "токены"

    def __str__(self):
        return str(self.id)


class Protocol(models.Model):
    number_of_voters = models.IntegerField(
        verbose_name="Число избирателей", default=0)
    number_of_bulletins = models.IntegerField(
        verbose_name="Полученные бюллетени", default=0)
    spoiled_bulletins = models.IntegerField(
        verbose_name="Недействительные бюллетени", default=0)
    valid_bulletins = models.IntegerField(
        verbose_name="Действительные бюллетени", default=0)

    class Meta:
        verbose_name = "протокол"
        verbose_name_plural = "протоколы"

    def __str__(self):
        return str(self.id)


class VotingArea(models.Model):
    district = models.TextField(
        verbose_name="Административный округ")
    is_opened = models.BooleanField(
        verbose_name="Участок открыт", default=True)
    num_voting_area = models.IntegerField(
        verbose_name="Номер участка", default=0, unique=True)
    max_people = models.IntegerField(
        verbose_name="Макс кол-во людей", default=0)
    count_voters = models.IntegerField(
        verbose_name="Кол-во проголосовавших", default=0)
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, null=True, blank=True, verbose_name="Сотрудник")
    protocol = models.OneToOneField(
        Protocol, on_delete=models.CASCADE, null=True, blank=True, verbose_name="Протокол")

    class Meta:
        verbose_name = "участок"
        verbose_name_plural = "участки"

    def __str__(self):
        return "№"+str(self.num_voting_area)


class Consigment(models.Model):
    name = models.CharField(max_length=50, unique=True,
                            verbose_name="Название партии")

    class Meta:
        verbose_name = "партия"
        verbose_name_plural = "партии"

    def __str__(self):
        return self.name


class Candidate(models.Model):
    full_name = models.CharField(
        max_length=255, unique=True, verbose_name="ФИО")
    photo = models.ImageField(verbose_name="Фото кандидата")
    is_self_promoted = models.BooleanField(
        default=False, verbose_name="Самовыдвиженец")
    consigment = models.OneToOneField(
        Consigment, on_delete=models.CASCADE, null=True, blank=True, verbose_name="Партия")

    class Meta:
        verbose_name = "кандидат"
        verbose_name_plural = "кандидаты"

    def __str__(self):
        return self.full_name


class Result(models.Model):
    candidate = models.OneToOneField(
        Candidate, on_delete=models.CASCADE, verbose_name="Кандидат")
    count_votes = models.IntegerField(
        default=0, verbose_name="Число голосов")

    class Meta:
        verbose_name = "результат"
        verbose_name_plural = "результаты"

    def __str__(self):
        return str(self.id)


class TimeTurnout(models.Model):
    voting_area = models.ForeignKey(
        VotingArea, on_delete=models.CASCADE, verbose_name="Избирательный участок")
    add_time = models.TimeField(
        auto_now_add=True, verbose_name="Время ввода данных")
    count_voters = models.IntegerField(
        verbose_name="Кол-во проголосовавших", default=0)

    class Meta:
        verbose_name = "явка"
        verbose_name_plural = "явки"

    def __str__(self):
        return "№"+str(self.id)
