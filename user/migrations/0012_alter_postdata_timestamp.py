# Generated by Django 3.2.16 on 2024-02-05 12:42

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0011_alter_postdata_timestamp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postdata',
            name='timestamp',
            field=models.DateTimeField(default=datetime.datetime(2024, 2, 5, 18, 12, 57, 894477)),
        ),
    ]
