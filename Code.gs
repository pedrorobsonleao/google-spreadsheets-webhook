var configuration = {
  has: function () {
    if (this.sheet == null) {
      this.sheet = SpreadsheetApp.getActive().getSheetByName('settings');
      this.tokenlist = {};

      this.sheet.getRange("A:B").getValues()
        .filter(obj => { return (obj[0] != "" && obj[0] != "User") })
        .forEach(obj => {
          this.tokenlist[obj[1]] = obj[0];
        });
    }
    return (this.sheet != null);
  },
  get: function (token) {
    return this.tokenlist[token.trim()];
  }
};

//this is a function that fires when the webapp receives a GET request
function doGet(e) {
  return HtmlService.createHtmlOutput("request received");
}

//this is a function that fires when the webapp receives a POST request
function doPost(e) {
  if(e.postData && e.postData.contents) {
    let params = JSON.stringify(e.postData.contents);
    params = JSON.parse(params);
    let data = JSON.parse(e.postData.contents);

    if (configuration.has()) {
      let user = configuration.get(data.token);

      data.data.user = user;
      data.data.date = new Date();

      let responseMsg = "discarded post";
      if (user) {
        var sheet = SpreadsheetApp.getActive().getSheetByName(data.sheet_name);
        if (sheet) {
          let header = sheet.getRange("A1:Z1").getValues();
          let values = [];
          header[0].forEach((key, idx) => {
            if (data.data[key]) {
              values[idx] = data.data[key];
            }
          });

          sheet.appendRow(values);
          responseMsg = "post accepted";
          SpreadsheetApp.flush();
        }
      }
    }

    return HtmlService.createHtmlOutput(responseMsg);
  }
}


function uuid() {
  return Utilities.getUuid();
}
