1. curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
2. az login --use-device-code
3. az extension add --name db-up
4. Variablen in create-database.sh anpassen
5. bash create-database.sh
6. Add runtime to .azure/config
7. az webapp up