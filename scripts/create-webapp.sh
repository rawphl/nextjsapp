#!/bin/bash

location=switzerlandnorth
name=bbc-nextjs-template-app
resourceGroup=bbc-nextjs-template-group
runtime="NODE|18-lts"

az webapp up \
    --name $name \
    --resource-group $resourceGroup \
    --location $location \
    --runtime $runtime \
