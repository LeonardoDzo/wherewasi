// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let button = document.getElementById('button');
let searchInput = document.getElementById('searchInput');
let urlLabel = document.getElementById('url');
let subtitleDiv = document.getElementById('subtitle');

function find(value) {
  let query = { 'text': value };
  chrome.history.search(query, function (results) {
    let lastResult = results[0];
    subtitleDiv.style.visibility = 'visible';
    updateUrlLabel(lastResult)
  });
}

button.onclick = function (element) {
   let value = searchInput.value;
   if (value != "") {
     find(value);
   } else {
     searchInput.focus();
   }
};

function updateUrlLabel(lastResult) {
  if (lastResult != undefined) {
    urlLabel.textContent = lastResult['url'];
    urlLabel.onclick = function (element) {
      let url = urlLabel.textContent;
      window.open(url)
    };
  } else {
    urlLabel.onclick = null;
    urlLabel.textContent = "None"
  }
}