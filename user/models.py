from django.db import models
from datetime import datetime
# Create your models here.

class User(models.Model):
    user_id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=60,null = True,blank = True,default=None)
    signup_otp = models.CharField(max_length=4)
    mobileNumber = models.CharField(max_length=10)
    emailId = models.EmailField()
    password = models.CharField(max_length=8 ,unique=True , blank=False, error_messages={'required': 'Password cannot be null'})

    def __str__(self):
        return str(self.user_id) 

class Postdata(models.Model):
    postId = models.BigAutoField(primary_key=True)
    postuserid = models.ForeignKey(User, on_delete=models.CASCADE, to_field='user_id',null=True, blank=True)
    timestamp = models.DateTimeField(default=datetime.now())
    like_count = models.IntegerField(null=True, blank=True,default=0)
    comment = models.CharField(max_length=20, null=True, blank=True,default=None)
    post_data = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return str(self.postuserid) 


