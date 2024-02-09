from django.shortcuts import render
from django.conf import settings
from django.shortcuts import redirect, render
from django.contrib import messages
from .models import *
from django.core.mail import send_mail
import math
import random
import hashlib
from django.db.models import Q
from django.http import JsonResponse

from django.shortcuts import get_object_or_404


# 
def welcome(request):
    messages.success(request,"Welcome to the Library management System")
    return render(request,'welcome.html')
#------------------------------------ADMIN DASHBOARD-----------------------------------------------------#
def dash(request):
    # print(request.session.get('loggedin'))
    if request.session.get('loggedin',False)==False:
        print("You need to sign in first!")
        messages.success(request,"You need to sign in first!")
        return redirect('/')
    messages.success(request,"Welcome to Franzo!")
    user_id=request.session['user_id']
    user_obj=User.objects.get(user_id=user_id)
    request.session['user_id']=user_id
    request.session['name']=user_obj.name
    name=request.session['name']
    get_post = Postdata.objects.filter(postuserid=user_id).all()
    context = {'name' : name,'user_post':get_post}
    return render(request,'combine_profile.html',context)

def login(request):
    if request.method == "POST":
        emailId=request.POST.get('EmailId')
        password=request.POST.get('Password')
        print("data:",emailId,password)
        print(hashlib.md5(password.encode()).hexdigest())
        user_obj=User.objects.filter(emailId=emailId,password=hashlib.md5(password.encode()).hexdigest()).first()
        print(user_obj)
        if user_obj is not None:
            print(user_obj.user_id)
            print("Successfully login")
            messages.success(request,"Successfully login")
            request.session['user_id']=user_obj.user_id
            request.session['loggedin']=True
            return redirect('dash/')
        else:
            print("Student Not Found")
            messages.error(request,"Student Not Found")
            return redirect('/')
           
    return render(request,'login.html')

def register(request):
    print(request)
    if request.method == "POST":
        name=request.POST.get('Name')
        print(name)
        mobilenumber=request.POST.get('MobileNumber')
        print(mobilenumber)
        emailId=request.POST.get('EmailId')
        print(emailId)
        password=request.POST.get('Password')
        print(password)

        check_user=User.objects.filter(emailId=emailId).first()
        if check_user:
            messages.success(request,"User Already Exist")
            return render(request,'register.html')
        user_obj=User.objects.create(emailId=emailId,name=name,password=hashlib.md5(password.encode()).hexdigest())
        print(user_obj)
        request.session['user_id']=user_obj.user_id
        
        subject='Verify your email'
        digits = "0123456789"
        signup_otp = ""
        for i in range(4):
            signup_otp += str(digits[math.floor(random.random() * 10)])    

        message='Your OTP for email verification is '+signup_otp
       
        from_email= settings.EMAIL_HOST_USER
       
        to_list = [emailId]
      
        send_mail(subject,message,from_email,to_list,fail_silently=True)
        messages.success(request,"OTP sent on your Email!")
        context ={'signupotp' : signup_otp}
        user_id=request.session.get('user_id')
        print(user_id)
        User.objects.update(user_id=user_id,signup_otp=signup_otp)
        return redirect('/otpverify',context)
    return render(request,'register.html')

def otpverify(request):
    user_id=request.session.get('user_id')

    if request.method == 'POST':
        signup_otp1 = request.POST.get('otp')
        otp_obj = User.objects.get(user_id=user_id)
        print(otp_obj)
    
        if signup_otp1 == otp_obj.signup_otp:

            otp_obj.verified_status=True
            otp_obj.save()
            messages.success(request,"Successfully Registered!")
            return redirect('/')
        else:
            messages.error(request,"Invalid OTP,Try Again!")
            return redirect('/otpverify')

    return render(request,'signup_otp.html')


def change_password(request):
    if request.method == "POST":
        OldPassword=request.POST.get('OldPassword')
        NewPassword=request.POST.get('NewPassword')
        ConfirmPassword = request.POST.get('ConfirmPassword')
        user_id=request.session.get('user_id')
        user_obj=User.objects.filter(user_id=user_id,password=hashlib.md5(OldPassword.encode()).hexdigest()).first()
        print(user_obj)
        if user_obj is not None:
            user_obj.password=hashlib.md5(NewPassword.encode()).hexdigest()
            user_obj.save()
            print("Changed Password Successfully!")
            messages.success(request,"Changed Password Successfully!")
            request.session['user_id']=user_obj.user_id
            request.session['loggedin']=True
            return redirect('dash/')
        else:
            print("Student Not Found")
            messages.error(request,"Student Not Found")
            return redirect('/')
           
    return render(request,'login.html')


def aboutme(request):
    name=request.session['name']

    context = {'name' : name}

    if request.session.get('loggedin',False)==False:
        print("You need to sign in first!")
        messages.success(request,"You need to sign in first!")
        return redirect('/')
    return render(request,'about_me_dummy.html',context)

def preferences(request):
    name=request.session['name']

    context = {'name' : name}

    if request.session.get('loggedin',False)==False:
        print("You need to sign in first!")
        messages.success(request,"You need to sign in first!")
        return redirect('/')
    return render(request,'Preferences_Page.html',context)


def search(request):
    results = None
    print(request)
    if request.method == "POST":
        search = request.POST.get('search')
        print(search)
        if search:
            results = User.objects.filter(Q(name__icontains=search)).all()
        else:
            results = User.objects.all()

    print("res:",results)        
    context = {'results': results}
    return render(request, 'search_friend.html', context)

def user_post(request):
    print(request.method)
    user_id = request.session.get('user_id')  # Assuming user_id is stored in the session
    user_instance = get_object_or_404(User, user_id=user_id)
    

    if request.method == "POST":
        post = request.POST.get('post')
        print(post)
        if post:
            posttt = Postdata.objects.create(postuserid=user_instance,post_data=post)
            get_post = Postdata.objects.filter(postuserid=user_instance).all()
            print(get_post)


    context = {'user_post':get_post}
    print(context)
    return render(request, 'combine_profile.html',context)

def get_post(request):
    print(request.method)
    user_id = request.session.get('user_id')  
    fetch_post = User.objects.filter(user_id=user_id)
    print(fetch_post)
    return render(request, 'combine_profile.html',fetch_post)

def increment_like(request, post_id):
    # Fetch the post from the database
    post = Postdata.objects.get(pk=post_id)
    
    # Increment the like count
    post.like_count += 1
    post.save()
    # Return a JSON response indicating success
    return JsonResponse({'success': True, 'like_count': post.like_count})
def friend_list(request):
    name=request.session['name']

    context = {'name' : name}

    if request.session.get('loggedin',False)==False:
        print("You need to sign in first!")
        messages.success(request,"You need to sign in first!")
        return redirect('/')
    return render(request, 'friend_list.html',context)
    

   
def logout(request):
    if request.session.get('loggedin',False)==False:
            messages.success(request,"You need to sign in first!")
            return redirect('/')
    print(request.session.get('loggedin'))
    request.session.clear()
    messages.success(request,'Successfully Logout')
    return redirect('welcome/')        