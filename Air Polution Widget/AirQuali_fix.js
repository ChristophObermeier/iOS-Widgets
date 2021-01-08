// ***Air Quality Widget***
//
// Copyright (C) 2020 by ChristophObermeier
//
// Permission to use, copy, modify, and/or distribute this software is hereby granted. 
// However you have to respect the Terms of Service of the Air Quality Open Data Platform: https://aqicn.org/api/tos/
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
// INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER
// IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE
// OF THIS SOFTWARE.
//
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: cloud;
//** Script for scriptable to get the current Air Polution of your city 
 //Thank you World Air Quality Index Project for gathering all the data!

// AQI Logo
const logoImg = await getImage('AQI-logo.png');

//AQI Scale and Color Legend
const url = "https://aqicn.org/scale/"

function createWidget(keyword, aqi, date, url){

 let widget = new ListWidget()

  let title = widget.addText([keyword] + " Air Quality")
  title.font = Font.boldSystemFont(12);
  title.centerAlignText();
  title.minimumScaleFactor = 0.5;
  title.lineLimit = 2;

  widget.addSpacer();

  let row = widget.addStack();
  row.layoutHorizontally();
  row.addSpacer(12);
  const aqiLogo = row.addImage(logoImg);
  aqiLogo.imageSize = new Size(12, 12);
  row.addSpacer(5)
  let aqiTitle = row.addText("Air Quality Index");
  aqiTitle.font = Font.regularSystemFont(10);
  aqiTitle.textColor = Color.black();
  aqiTitle.centerAlignText();
  aqiTitle.minimumScaleFactor = 0.5;

  //Air Quality Levels
  let aqiText = widget.addText(aqi);
  aqiText.font = Font.boldSystemFont(40);
  aqiText.centerAlignText();
  aqiText.minimumScaleFactor = 1;
  if (aqi >= 300) {
    aqiText.textColor = Color.white();
    widget.backgroundColor = new Color("#7e0023");
    let aqiText1 = widget.addText("HAZARDOUS:😷🏠");
    aqiText1.font = Font.boldSystemFont(10);
    aqiText1.textColor = Color.white();
    aqiText1.centerAlignText();
    aqiText1.minimumScaleFactor = 1;
  } else if (aqi >= 201) {
    aqiText.textColor = Color.white();
    widget.backgroundColor = new Color("#660099");
    let aqiText1 = widget.addText("VERY UNHEALTHY:👵🏽👶🏼@🏠");
    aqiText1.font = Font.boldSystemFont(8);
    aqiText1.textColor = Color.white();
    aqiText1.centerAlignText();
    aqiText1.minimumScaleFactor = 0.7;
  } else if (aqi >= 151) {
    aqiText.textColor = Color.white();
    widget.backgroundColor = new Color("#cc0033");
    let aqiText1 = widget.addText("UNHEALTHY:⏱–>🏠");
    aqiText1.font = Font.boldSystemFont(10);
    aqiText1.textColor = Color.white();
    aqiText1.centerAlignText();
    aqiText1.minimumScaleFactor = 0.8;
  } else if (aqi >= 101) {
    aqiText.textColor = Color.white();
    widget.backgroundColor = new Color("#ff9933");
    let aqiText1 = widget.addText("☠️ sensitive groups–>🏠");
    aqiText1.font = Font.boldSystemFont(10);
    aqiText1.textColor = Color.white();
    aqiText1.centerAlignText();
    aqiText1.minimumScaleFactor = 0.7;
  } else if (aqi >= 51) {
    aqiText.textColor = Color.white();
    widget.backgroundColor = new Color("#ffde33");
    let aqiText1 = widget.addText("MODERATE:👶🤧🔜🏠");
    aqiText1.font = Font.boldSystemFont(10);
    aqiText1.textColor = Color.white();
    aqiText1.centerAlignText();
    aqiText1.minimumScaleFactor = 0.7;
  } else if (aqi >= 0) {
    aqiText.textColor = Color.white();
    widget.backgroundColor = new Color("#009966");
    let aqiText1 = widget.addText("GOOD:🏕🚶🏻🏃🏽‍♀️🚴🏻‍♀️");
    aqiText1.font = Font.boldSystemFont(10);
    aqiText1.textColor = Color.white();
    aqiText1.centerAlignText();
  } else {
    aqiText.textColor = Color.red();
    widget.backgroundColor = Color.white();
  }

  //Last Update of Data
  let dateText = widget.addText(date + " (loc. time)");
  dateText.font = Font.regularSystemFont(6);
  dateText.centerAlignText();
  dateText.minimumScaleFactor = 0.3;

  widget.addSpacer();

  //Thx World Air Quality Project
  let Text = widget.addText("🙏🏽World Air Quality Project");
  Text.font = Font.boldSystemFont(5);
  Text.textColor = Color.black();
  Text.centerAlignText();
  Text.minimumScaleFactor = 0.4;

  return widget;
}

//Get City from Air Quality Open Data Platform
async function getData(keyword) {
    let req = new Request(`https://api.waqi.info/search/?keyword=${keyword}&token=19b71483eb9ddd3831a5e83312cd860fb00fa03d`)
    req.method = "GET"
    let response = await req.loadJSON()
     
    if (Object.keys(response.data).length != 0) {
        var result = '{"aqi" : "'+response.data[0].aqi+'", "date" : "'+response.data[0].time.stime+'"}'        
    } else {
        var result = '{"aqi" : "N/A", "date" : "k. A."}'        
    }
    return result
}
//Search Keyword in Air Quality Open Database
if (config.runsInApp) {
    // Demo in-App visit https://aqicn.org/ for more cities
    let keyword = "Milan"
    let data = await getData(keyword)
    data = JSON.parse(data)
    let widget = createWidget(keyword, data.aqi, data.date)
    Safari.open(url)
    widget.presentSmall()
} else {
    // Not in-App - use of fixed Parameter
    let keyword = args.widgetParameter
    let data = await getData(keyword)
    data = JSON.parse(data)
    let widget = createWidget(keyword, data.aqi, data.date)
    Safari.open(url)
    Script.setWidget(widget)
}

// Get and save Logo
async function getImage(logo) {
  let fm = FileManager.local()
  let dir = fm.documentsDirectory()
  let path = fm.joinPath(dir, logo)

  if (fm.fileExists(path)) {
    return fm.readImage(path)
  } else {
    // download once
    let imageUrl

    switch (logo) {
      case 'AQI-logo.png':
        imageUrl = "https://waqi.info/icons/logo.png";
        break
      default:
        console.log(`Sorry, couldn't find ${logo}.`);
        break
      }
      let iconImage = await loadImage(imageUrl)
      fm.writeImage(path, iconImage)
      return iconImage
   }
}

// helps to download an image from a given url
async function loadImage(imgUrl) {
  console.log('loadImage')
  const req = new Request(imgUrl)
  return await req.loadImage()
}

Script.complete()
