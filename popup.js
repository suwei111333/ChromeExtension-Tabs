// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var main = function()
{
	var myCollections = {};
	var colorList =["#AA1122", "#11AA00", "#2200AA", "#2233AA", "#2200FF", "#22FFAA"];
	chrome.storage.local.get(null, function(items){
		var collectionNames = Object.keys(items);
		for(var i = 0; i < collectionNames.length; i++)
		{
			
			var Name = collectionNames[i];
			myCollections[Name] = items[Name];
			$('.Collections').prepend("<li><button type=\"button\" id=\""+Name+"\" style=\"background-color: "+ colorList[i% 6]+"\">Open</button>"+ Name + "</li>");
			$("#"+Name).click(function(){
				var collect = $(this).attr("id");
				var tablist = myCollections[collect];
				for(var tab in tablist)
				{
					chrome.tabs.create({url: tablist[tab]});
				}
				
			});
		}
	});
	
	
	
	var myCollectpair = {};
	chrome.tabs.query({currentWindow: true}, function(tabs){
	
			var tablen = tabs.length;
			for(var i = 0; i< tablen; i++)
			{
				var curTab = tabs[i];
				$('.tablist').prepend("<li><a href=\""+ curTab.url + "\">" + curTab.title + "</a></li>");
				myCollectpair[curTab.title] = curTab.url;
			}
	});
	
	$("#Save").click(function()
	{
		var CollectName = $("#TabCollection").val();
		var mObj = {};
		mObj[CollectName] = myCollectpair;
		chrome.storage.local.set(mObj, function() {
			alert("save OK");
		});
		myCollections[CollectName] = myCollectpair;
		
		$('.tablist').empty();
		$('.Collections').prepend("<li><button type=\"button\" id=\""+CollectName+"\" disabled=\"disabled\">Open</button>"+ CollectName + "</li>");
	});
	
	$("#ClearAll").click(function()
	{
		chrome.storage.local.clear();
		myCollections={};
		$('.Collections').empty();
	});
	
};

$(document).ready(main);