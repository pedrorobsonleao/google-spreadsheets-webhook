# google-spreadsheets-webhook
---
Webhook on Google Spreadsheek

this code implement a simple webhook in google spreadsheet platform.

this project is based in :
* [Capturing Webhooks with Google Sheets](https://blog.runscope.com/posts/tutorial-capturing-webhooks-with-google-sheets)
* [ samaybar/googlewebhookreceiver](https://github.com/samaybar/googlewebhookreceiver)

## how to use this

* [active Google App Script API](https://script.google.com/home/usersettings)

this is a sample, change to your parameter to use.


1. create a empty google spreadseet.
2. create a sheet call **settings**.
3. create a sheet call **disk**

### settings sheet

|User|Token|
|-|-|
|User One|7536a99d-40b0-4557-bd2a-1a3d5d7e1f8|
|User Two|7536a99d-40b0-4557-bd2a-1a3d5d7e1f9|


### disk sheet

|total|total_unit|used|used_unit|host|address|user|date|
|-|-|-|-|-|-|-|-|
| | | | | | | | |

### install webhook script

1. copy the code in code.gs file.
1. in spreadsheet go to *tools* >*script editor* and paste the code.
1. call the project with **webhook** and save.
1. goto to *publish* > *deploy as web app*.
1. set project version.
1. set **Execute the app as:** *Me*.
1. set **Who has access to the app:** *Anyone, even anonymous*.
1. **Deploy**.

You need review the permissions to run this script.

After the review you have the webhook url.

Save this url to use with your integration.

#### data to this sample

```json
{
   "sheet_name":"disk",
   "token":"xxxxxxxx-xxxx-xxxx-xxxxx-xxxxxxxxxxxx",
   "data":{
      "total":50,
      "total_unit":"Gb",
      "used":1234546789,
      "used_unit":"bites",
      "host":"win-ax-app0",
      "address":"192.168.1.100"
   }
}
```

#### other data sample

```json
{
   "sheet_name":"cpu",
   "token":"xxxxxxxx-xxxx-xxxx-xxxxx-xxxxxxxxxxxx",
   "data":{
      "address":"192.168.1.100",
      "host":"myhost",
      "since":"07:01:29",
      "up":"1:37",
      "users":4,
      "load-1":0.54,
      "load-5":1.17,
      "load-15":1.44
   }
}
```

### mandatory elements in data

* **sheet_name** - name from worksheet to write data.
* **token** - access token to write in spreadsheet, this token is write in sheet ***settings***.
* **data** - to write in sheet the fields in data element you need write the name in the first line of the sheet.

### sample requests

```bash
curl \
    --header 'Content-Type: application/json;charset=UTF-8' \
    --data-binary '{"sheet_name": "disk","token": "xxxxxxxx-xxxx-xxxx-xxxxx-xxxxxxxxxxxx","data": {"total": 50,"total_unit": "Gb","used": 1234546789,"used_unit": "bites","host": "win-ax-app0","address": "192.168.1.100"}}' \
    --silent 'https://script.google.com/macros/s/<id>/exec'
```

```bash
curl \
    --header 'Content-Type: application/json;charset=UTF-8' \
    --data-binary '{"sheet_name": "cpu","token": "xxxxxxxx-xxxx-xxxx-xxxxx-xxxxxxxxxxxx","data": {"address": "192.168.1.100","host":"myhost","since": "07:01:29", "up":"1:37", "users":4, "load-1":0.54, "load-5":1.17, "load-15":1.44}}' \
    --silent 'https://script.google.com/macros/s/<id>/exec'
```
