# google-spreadsheets-webhoot
---
Webhook on Google Spreadsheet

this code implement a simple webhook in google spreadsheet platform.

this project is based in :
* [Capturing Webhooks with Google Sheets](https://blog.runscope.com/posts/tutorial-capturing-webhooks-with-google-sheets)
* [ samaybar/googlewebhookreceiver](https://github.com/samaybar/googlewebhookreceiver)

## how to use this

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
