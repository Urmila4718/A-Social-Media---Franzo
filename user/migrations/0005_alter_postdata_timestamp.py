# Generated by Django 3.2.23 on 2024-01-15 07:52

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_alter_postdata_timestamp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postdata',
            name='timestamp',
            field=models.DateTimeField(default=datetime.datetime(2024, 1, 15, 13, 22, 37, 276711)),
        ),
    ]
