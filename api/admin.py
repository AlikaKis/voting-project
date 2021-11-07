from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from api.models import Candidate, Consigment, Protocol, RefreshTokens, Result, User, VotingArea, TimeTurnout
from import_export.admin import ImportExportActionModelAdmin
from import_export import resources
from import_export import fields
from import_export.widgets import ForeignKeyWidget

class UserCustomAdminResource(resources.ModelResource):
    class Meta:
        model = User

class UserCustomAdmin(ImportExportActionModelAdmin):
    resource_class = UserCustomAdminResource
    ordering = ('login',)
    list_display = ('id', 'email', 'login', 'userType', 'date_joined')
    search_fields = ('email', 'login',)
    readonly_fields = ('date_joined', 'last_login',)
    list_filter = ('userType', )
    filter_horizontal = ()

#
# class UserCustomAdmin(UserAdmin):
#     ordering = ('login',)
#     list_display = ('id', 'email', 'login',  'userType', 'date_joined')
#     search_fields = ('email', 'login',)
#     readonly_fields = ('date_joined', 'last_login',)
#     filter_horizontal = ()
#     fieldsets = ((None, {
#         'fields': (
#             'login', 'email', 'password', "userType", "is_admin",
#             "last_login",
#
#         )
#     }),)
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('email', 'login', "userType", "is_admin", 'password1', 'password2'),
#         }),
#     )
#     list_filter = ('userType', )


class RefreshTokensAdmin(admin.ModelAdmin):
    list_display = ('userId', 'refreshToken', 'created_at', 'expiresIn')
    readonly_fields = ('refreshToken', 'userId',)
    fieldsets = ((None, {
        'fields': (
            'refreshToken',
            'expiresIn',
            'userId',

        )
    }),)
    filter_horizontal = ()

class ProtocolResource(resources.ModelResource):
    class Meta:
        model = Protocol

class ProtocolAdmin(ImportExportActionModelAdmin):
    resource_class = ProtocolResource
    list_display = ('number_of_voters', 'number_of_bulletins',
                    'spoiled_bulletins', 'valid_bulletins')
    filter_horizontal = ()


# class ProtocolAdmin(admin.ModelAdmin):
#     list_display = ('number_of_voters', 'number_of_bulletins',
#                     'spoiled_bulletins', 'valid_bulletins')
#     fieldsets = ((None, {
#         'fields': (
#             'number_of_voters',
#             'number_of_bulletins',
#             'spoiled_bulletins',
#             'valid_bulletins'
#
#         )
#     }),)
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('number_of_voters', 'number_of_bulletins', "spoiled_bulletins", "valid_bulletins",),
#         }),
#     )
#     filter_horizontal = ()

class VotingAreaResource(resources.ModelResource):
    user = fields.Field(column_name='user', attribute='user', widget=ForeignKeyWidget(User, 'login'))
    protocol = fields.Field(column_name='protocol', attribute='protocol', widget=ForeignKeyWidget(Protocol, 'id'))
    class Meta:
        model = VotingArea

class VotingAreaAdmin(ImportExportActionModelAdmin):
    resource_class = VotingAreaResource
    list_display = ('district', 'num_voting_area',
                    'is_opened', 'max_people', 'count_voters', 'user', 'protocol')
    search_fields = ('district', 'num_voting_area')
    list_filter = ('is_opened', )
    filter_horizontal = ()

# class VotingAreaAdmin(admin.ModelAdmin):
#     list_display = ('district', 'num_voting_area',
#                     'is_opened', 'max_people', 'count_voters', 'user', 'protocol')
#     fieldsets = ((None, {
#         'fields': (
#             'district', 'num_voting_area',
#             'is_opened', 'max_people', 'count_voters', 'user', 'protocol'
#
#         )
#     }),)
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('district', 'num_voting_area',
#                        'is_opened', 'max_people', 'count_voters', 'user', 'protocol'),
#         }),
#     )
#     search_fields = ('district', 'num_voting_area')
#     list_filter = ('is_opened', )
#     filter_horizontal = ()

class ConsigmentResource(resources.ModelResource):
    class Meta:
        model = Consigment

class ConsigmentAdmin(ImportExportActionModelAdmin):
    resource_class = ConsigmentResource
    list_display = ('id', 'name',)
    filter_horizontal = ()

# class ConsigmentAdmin(admin.ModelAdmin):
#     list_display = ('id', 'name',)
#     fieldsets = ((None, {
#         'fields': (
#             'name',
#
#         )
#     }),)
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('name', ),
#         }),
#     )
#     filter_horizontal = ()

class CandidateResource(resources.ModelResource):
    consigment = fields.Field(column_name='consigment', attribute='consigment', widget=ForeignKeyWidget(Consigment, 'name'))
    class Meta:
        model = Candidate

class CandidateAdmin(ImportExportActionModelAdmin):
    resource_class = CandidateResource
    list_display = ('id', 'full_name', 'is_self_promoted', 'consigment')
    search_fields = ('full_name',)
    list_filter = ('consigment',  'is_self_promoted')
    filter_horizontal = ()

# class CandidateAdmin(admin.ModelAdmin):
#     list_display = ('id', 'full_name', 'is_self_promoted', 'consigment')
#     fieldsets = ((None, {
#         'fields': (
#             'full_name', 'is_self_promoted', 'consigment',
#
#         )
#     }),)
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('full_name', 'is_self_promoted', 'consigment'),
#         }),
#     )
#     search_fields = ('full_name',)
#     list_filter = ('consigment',  'is_self_promoted')
#     filter_horizontal = ()

class ResultResource(resources.ModelResource):
    candidate = fields.Field(column_name='candidate', attribute='candidate', widget=ForeignKeyWidget(Candidate, 'full_name'))
    class Meta:
        model = Result


class ResultAdmin(ImportExportActionModelAdmin):
    resource_class = ResultResource
    list_display = ('id', 'count_votes', 'candidate',)
    filter_horizontal = ()


# class ResultAdmin(admin.ModelAdmin):
#     list_display = ('id', 'count_votes', 'candidate',)
#     fieldsets = ((None, {
#         'fields': (
#             'count_votes', 'candidate',
#
#         )
#     }),)
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('count_votes', 'candidate',),
#         }),
#     )
#     filter_horizontal = ()


class TimeTurnoutResource(resources.ModelResource):
    num_voting_area = fields.Field(column_name='num_voting_area', attribute='num_voting_area', widget=ForeignKeyWidget(VotingArea, 'num_voting_area'))
    class Meta:
        model = TimeTurnout


class TimeTurnoutAdmin(ImportExportActionModelAdmin):
    resource_class = TimeTurnoutResource
    list_display = ('id', 'voting_area', 'add_time', 'count_voters')
    exclude = ('add_time',)
    filter_horizontal = ()

# class TimeTurnoutAdmin(admin.ModelAdmin):
#     list_display = ('id', 'voting_area', 'add_time', 'count_voters')
#
#     exclude = ('add_time',)
#
#     fieldsets = ((None, {
#         'fields': (
#             'voting_area', 'count_voters',
#         )
#     }),)
#
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': (
#             'voting_area', 'count_voters',
#         )
#     }),)
#
#     filter_horizontal = ()

class AdminSite(admin.AdminSite):
    site_title = 'Выборы мэра Москвы'
    site_header = 'Выборы'
    index_title = 'Панель администрирования'

    def get_app_list(self, request):
        app_dict = self._build_app_dict(request)
        app_list = sorted(app_dict.values(), key=lambda x: x['name'].lower())
        return app_list


admin.site = AdminSite()


# Register your models here.
admin.site.register(User, UserCustomAdmin)
admin.site.register(RefreshTokens, RefreshTokensAdmin)
admin.site.register(Protocol, ProtocolAdmin)
admin.site.register(VotingArea, VotingAreaAdmin)
admin.site.register(Consigment, ConsigmentAdmin)
admin.site.register(Candidate, CandidateAdmin)
admin.site.register(Result, ResultAdmin)
admin.site.register(TimeTurnout, TimeTurnoutAdmin)
