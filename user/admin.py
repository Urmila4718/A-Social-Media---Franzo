from django.contrib import admin

# Register your models here.
from .models import *

class UserAdmin(admin.ModelAdmin):
    list_display =['user_id','name','signup_otp','mobileNumber','emailId','password']

admin.site.register(User,UserAdmin)


class PostAdmin(admin.ModelAdmin):
    list_display =['postId','postuserid','timestamp','like_count','comment','post_data']

admin.site.register(Postdata,PostAdmin)

