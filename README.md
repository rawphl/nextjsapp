# bbc-nextjs-app

## App setup

```
$ git clone
```

```
$ npm install
```

- lib/database/dump.sql in der lokalen mysql Instanu ausführen.
- .env.local Datei erstellen (Siehe nächster Schritt)

## .env.local
Folgende Variablen gehören in das .env.local File. Das File muss nach dem Clonen erstellt werden.

DB_HOST muss mit der IP des vEthernet WSL Adapters angepasst werde. Im Windows cmd:

```
$ ipconfig
```

```
NODE_ENV=development
SECRET_KEY=asouifhdsalfgkhdasuiofhaslkufjkhadsfjkhasdfasdukijlfhbukasd.hfjsdaf
DB_PORT=3306
DB_HOST=172.25.192.1
DB_USER=root
DB_PASSWORD=1234
DB_NAME=my-website-db
```

## Datenbank setup

Im lib/database Verzeichnis sollten die Dateien getConnection.js, dump.sql und DigiCertGlobalRootCA.crt.pem vorhanden sein.
Der Dump solllte mit einem CREATE DATABASE IF NOT EXISTS beginnen, da die Datenbank ohne Tabellen bereits beim Erstellen kreiert wird.

Achtung: getConnection ist nun asynchron:

```js
import getConnection from "@/lib/database/getConnection"
...
const connection = await getConnection()
```

Fehler beim Verbinden landen im Terminal / App log.

### Mit mysql Workbench verbinden
In der Workbench kann man sich mit dem gesetzten user und passwort so wie dem Host $appName-db.mysql.azure.com anmelden.

Im Tab SSL sollte unter SSL CA File die Datei DigiCertGlobalRootCA.crt.pem angegeben werden.


## Authentifizierung

Die Authentifizierung wurde mit iron-session: https://github.com/vvo/iron-session umgesetzt und ist cookiebasiert. Relevant hierfür sind die Datein lib/hooks/session.js sowie pages/api/auth/*.

Siehe auch _app.js für den Einsatz von useSession().

lib/hooks/redirect.js ist für Redirects zuständig. Pages, die nicht öffentlich zugänglich sein sollten, sollten via getStaticProps das privatePage Attribute als Props definieren:

pages/dashboard.js

```js
export async function getStaticProps() {
  return {
    props: {
      privatePage: true,
      posts: await fetchPosts()
    }
  }
}
```

Jede Page erhält die Session automatisch als Props:

```js
export default function Index({ session }) {
  return (
    <>
      <Head>
        <title>Index</title>
      </Head>
      <main className={styles.index}>
        <h1>Index</h1>
        {session && <Link href="/dashboard">Dashboard</Link>}
      </main>
    </>
  )
}
```

Wenn !session true ist, so ist der User nicht eingeloggt.

## Deployment

1. Azure CLI installieren:
```
    $ curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```
2. Einloggen:
```
    $ az login 
```

Falls redirect zu Browser nicht funktioniert:

```bash  
    $ az login --use-device-code
```

3. db-up Add-on installieren:
``` 
$ az extension add --name db-up
```

4. appName, dbUser und dbPassword Variablen in setup-azure.sh anpassen.

5. Setup script laufen lassen (kann 5-10 Minuten dauern):
```
$ bash setup-azure.sh
```

Der erste Deploy sollte nun online sein. In Zukunft kann die App mit
```
$ az webapp up --runtime "NODE|18-lts"
```

deployed werden. Das .azure Verzeichnis enthält die Angaben für die App.

## Fehlerbehandlung

### Resourcen löschen
Alle erstellen Resourcen können im Dashboard von Azure wieder gelöscht werden: https://portal.azure.com/#view/HubsExtension/BrowseAll.
Sobald alle weg sind, kann man das Deployment script nochmals laufen lassen.

### Deployment logs
Zuerst muss man auf das Dashboard der Webapp navigieren:

Im Azure Dashboard unter Deployment -> Deployment center -> logs kann man auf die Commit ID klicken. Im Fenster, das sich öffnet, sieht man das Deployment log unter Show logs...

#### App logs
Zuerst muss man auf das Dashboard der Webapp navigieren:

Im Azure Dashboard unter Monitoring -> Log stream sieht man die Logs der Applikation.


