from django.urls import path
from . import views
from django.conf import settings

urlpatterns = [
    path('welcome/',views.welcome),
                 path('dash/',views.dash),
                 path('',views.login),
                 path('register/',views.register),
                 path('otpverify/',views.otpverify),
                 path('aboutme',views.aboutme),
                 path('preference',views.preferences),
                 path('friends',views.friend_list),
                 path('franzo',views.logout),
                 path('search',views.search),
                  path('post',views.user_post),
                      path('increment_like/<int:post_id>/',views.increment_like, name='increment_like'),

]

