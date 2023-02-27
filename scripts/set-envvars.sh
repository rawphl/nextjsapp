#!/bin/bash

nodeEnv=production
secretKey=aspofjofidsaofjidsaojfdsafoasdjfldskjfklewsnrekjnsf
dbPort=3306
dbHost=bbc-nextjs-template.mysql.database.azure.com
dbUser=user
dbPassword=password
dbName=my-website-db
name=bbc-nextjs-template-app
resourceGroup=bbc-nextjs-template-group

az webapp config appsettings set \
    --name $name \
    --resource-group $resourceGroup \
    --settings "NODE_ENV=$nodeEnv" \
    "SECRET_KEY=$secretKey" \
    "DB_PORT=$dbPort" \
    "DB_HOST=$dbHost" \
    "DB_USER=$dbUser" \
    "DB_PASSWORD=$dbPassword" \
    "DB_NAME=$dbName"