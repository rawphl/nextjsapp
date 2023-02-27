#!/bin/bash

appName=bbc-project-app
resourceGroup=$appName-group
dbServerName=$appName-db
dbHost=$dbServerName.mysql.database.azure.com
dbPort=3306
dbUser=user
dbPassword=password
dbName=my-website-db
skuName=Standard_B1ms
tier=Burstable
publicAccess=0.0.0.0-255.255.255.255
location=switzerlandnorth
runtime="NODE|18-lts"
nodeEnv=production
secretKey=aspofjofidsaofjidsaojfdsafoasdjfldskjfklewsnrekjnsf

echo "Creating database $dbServerName"

az mysql flexible-server create --location $location \
    --resource-group $resourceGroup \
    --name $dbServerName \
    --admin-user $dbUser \
    --admin-password $dbPassword \
    --database-name $dbName \
    --sku-name $skuName \
    --tier $tier \
    --public-access $publicAccess


echo "Creating webapp $appName"

az webapp up \
    --name $appName \
    --resource-group $resourceGroup \
    --location $location \
    --runtime $runtime \

echo "Settings env variables for webapp $appName"

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