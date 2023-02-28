#!/bin/bash

appName=bbc-nextjs-app
resourceGroup=$appName-group

# Database
dbServerName=$appName-db
dbHost=$dbServerName.mysql.database.azure.com
dbUser=user
dbPassword=password
dbPort=3306
dbName=my-website-db

# Node
nodeEnv=production
secretKey="sadjkfhdsakjfhdsalkhfuiaesfhu<sodhfjadsuhfiuewahfr<ukshfd<sf"
runtime="NODE|18-lts"

# General
location=switzerlandnorth
skuName=Standard_B1ms
tier=Burstable
publicAccess=0.0.0.0-255.255.255.255

# Create database
az mysql flexible-server create \
    --location $location \
    --resource-group $resourceGroup \
    --name $dbServerName \
    --admin-user $dbUser \
    --admin-password $dbPassword \
    --database-name $dbName \
    --sku-name $skuName \
    --tier $tier \
    --public-access $publicAccess

# Run database dump
az mysql flexible-server execute \
    --name $dbServerName \
    --admin-user $dbUser \
    --admin-password $dbPassword \
    --file-path "./lib/database/dump.sql"

# Create web app
az webapp up \
    --name $appName \
    --resource-group $resourceGroup \
    --location $location \
    --runtime $runtime \

# Set environment variables
az webapp config appsettings set \
    --name $appName \
    --resource-group $resourceGroup \
    --settings "NODE_ENV=$nodeEnv" \
    "SECRET_KEY=$secretKey" \
    "DB_PORT=$dbPort" \
    "DB_HOST=$dbHost" \
    "DB_USER=$dbUser" \
    "DB_PASSWORD=$dbPassword" \
    "DB_NAME=$dbName"