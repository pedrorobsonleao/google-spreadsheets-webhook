let configuration = {
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


let Data = {
  setUser: function(user) {
    this.user = user;
  },
  setServiceTag: function(serviceTag) {
    this.serviceTag = serviceTag;
  },
  setHeader: function(header) {
    this.header = header;
  },
  set: function(data) {
    this.data = data;
  },
  get: function() {
    let values = [];
    
    this.data._user = this.user;
    this.data._date = new Date();
    
    if(this.serviceTag) {
      this.data.service_tag = this.serviceTag;
    }
    
    this.header.forEach((key,idx) => { 
      if (this.data[key]) {
        values[idx] = this.data[key];
      } 
    });
    return values;
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

    let responseMsg = "discarded post";
    
    if (configuration.has()) {
      let user = configuration.get(data.token);


      if (user) {
        var sheet = SpreadsheetApp.getActive().getSheetByName(data.sheet_name);
        if (sheet) {
          let header = sheet.getRange("A1:ZZ1").getValues();
         
          Data.setUser(user);
          Data.setHeader(header[0]);
          Data.setServiceTag(data.service_tag);
          
          if (Array.isArray(data.data)) {
            data.data.forEach(_data => {
              Data.set(_data);                
              sheet.appendRow(Data.get());
            });
          } else { 
            Data.set(data.data);
            sheet.appendRow(Data.get());
          }

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
