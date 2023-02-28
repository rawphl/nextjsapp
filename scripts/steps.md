1. curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
2. az login (--use-device-code)
3. az extension add --name db-up
4. Variablen in setup.sh anpassen
5. bash setup.sh
7. az webapp up --runtime "NODE|18-lts"