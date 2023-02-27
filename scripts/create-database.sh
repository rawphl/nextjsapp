#!/bin/bash

location=switzerlandnorth
resourceGroup=bbc-nextjs-template-group
server=bbc-next-template
user=user
password=password
skuName=Standard_B1ms
tier=Burstable
publicAccess=0.0.0.0-255.255.255.255

az mysql flexible-server create --location $location \
    --resource-group $resourceGroup \
    --name $server \
    --admin-user $user \
    --admin-password $password \
    --sku-name $skuName \
    --tier $tier \
    --public-access $publicAccess