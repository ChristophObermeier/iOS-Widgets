// ***MVG Departure Widget***
//
// Copyright (C) 2020 by ChristophObermeier
//
// Permission to use, copy, modify, and/or distribute this software is hereby granted. 
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
// INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER
// IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE
// OF THIS SOFTWARE.
//
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: train;
// * Script for scriptable to catch the next metro in munich at your location
//*jshint esversion: 6 */

// Get your Station here https://www.mvg.de/dienste/abfahrtszeiten.html
//"München" is not required to enter
const station = args.widgetParameter

const mvgstatID = "https://www.mvg.de/api/fahrinfo/location/queryWeb?q=" + station;
var responseID;
responseID = await new Request(mvgstatID).loadJSON();

// Store the MVG ID
const mvgID = responseID.locations[0].id.toString();

//Set your preferred MVG products
const footway = false
const bus = false
const ubahn = true
const sbahn = false
const tram = false
const zug = false

//Get departures
const mvgReq = "https://www.mvg.de/api/fahrinfo/departure/" + mvgID + "?sbahn=" + sbahn + "&ubahn=" + ubahn + "&bus=" + bus + "&tram=" + tram + "&footway" + footway + "&zug=" + zug;
var response
response = await new Request(mvgReq).loadJSON();

function calculateTimeOffset(times) {
return Math.round((times - Date.now()) / 60000);
}

// Store the MVG values.
// Departure #1
const destination1 = response.departures[0].destination.toString()
const label1 = response.departures[0].label.toString()
const platform1 = response.departures[0].platform
const delay1 = response.departures[0].delay
const time1 = calculateTimeOffset(response.departures[0].departureTime)
const abfahrt1 = delay1 + time1

// Departure #2
const destination2 = response.departures[1].destination.toString()
const label2 = response.departures[1].label.toString()
const platform2 = response.departures[1].platform
const delay2 = response.departures[1].delay
const time2 = calculateTimeOffset(response.departures[1].departureTime)
const abfahrt2 = delay2 + time2

// Departure #3
const destination3 = response.departures[2].destination.toString()
const label3 = response.departures[2].label.toString()
const platform3 = response.departures[2].platform
const delay3 = response.departures[2].delay
const time3 = calculateTimeOffset(response.departures[2].departureTime)
const abfahrt3 = delay3 + time3

// Departure #4
const destination4 = response.departures[3].destination.toString()
const label4 = response.departures[3].label.toString()
const platform4 = response.departures[3].platform
const delay4 = response.departures[3].delay
const time4 = calculateTimeOffset(response.departures[3].departureTime)
const abfahrt4 = delay4 + time4

const widget = await createWidget()

if (!config.runsInWidget) {
	await widget.presentMedium()
}

Script.setWidget(widget)

function createWidget() {

  let widget = new ListWidget()

  widget.backgroundColor = new Color("004d99")

  let title = widget.addText("🚉 Next Departures @" + [station])
  title.font = Font.boldSystemFont(15)
  title.textColor = Color.white()
  title.centerAlignText()
  title.minimumScaleFactor = 0.5
  title.lineLimit = 2

  widget.addSpacer(15)

  //Departure #1
  let destinationText1 = widget.addText("⏱ "+abfahrt1 + "min " + label1 + " ➡️ " + destination1 + " @" + platform1)
  destinationText1.font = Font.boldSystemFont(10)
  destinationText1.textColor = Color.white()
  destinationText1.centerAlignText()
  destinationText1.minimumScaleFactor = 0.6

  widget.addSpacer(10)

  //Departure #2
  let destinationText2 = widget.addText("⏱ "+abfahrt2 + "min " + label2 + " ➡️ " + destination2 + " @" + platform2)
  destinationText2.font = Font.boldSystemFont(10)
  destinationText2.textColor = Color.white()
  destinationText2.centerAlignText()
  destinationText2.minimumScaleFactor = 0.6

  widget.addSpacer(10)

  //Departure #3
  let destinationText3 = widget.addText("⏱ "+abfahrt3 + "min " + label3 + " ➡️ " + destination3 + " @" + platform3)
  destinationText3.font = Font.boldSystemFont(10)
  destinationText3.textColor = Color.white()
  destinationText3.centerAlignText()
  destinationText3.minimumScaleFactor = 0.6

  widget.addSpacer(10)

  //Departure #4
  let destinationText4 = widget.addText("⏱ "+abfahrt4 + "min " + label4 + " ➡️ " +destination4 + " @" + platform4)
  destinationText4.font = Font.boldSystemFont(10)
  destinationText4.textColor = Color.white()
  destinationText4.centerAlignText()
  destinationText4.minimumScaleFactor = 0.6
return widget
}
Script.complete()
