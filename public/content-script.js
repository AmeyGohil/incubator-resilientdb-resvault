/**
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
* 
*   http://www.apache.org/licenses/LICENSE-2.0
* 
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.    
*/



/*global chrome*/
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  sendMessageToPage(request);
  sendResponse(true);
});

// Function to send a message to the webpage
function sendMessageToPage(request) {
  window.postMessage({ type: 'FROM_CONTENT_SCRIPT', data: request }, '*');
}

window.addEventListener("message", (event) => {
  if (
      event.source === window &&
      event.data.direction === "commit-page-script"
  ) {
      chrome.runtime.sendMessage({
        from: 'commit',
        data: event.data.message,
        amount: event.data.amount,
        address: event.data.address,
        event: event.data.event
      })
  }
  else if (event.source === window &&
    event.data.direction === "get-page-script") {
    chrome.runtime.sendMessage({
      from: 'get',
      id: event.data.id
    })
  }
  else if (event.source === window &&
    event.data.direction === "update-page-script") {
    chrome.runtime.sendMessage({
      from: 'update',
      id: event.data.id,
      data: event.data.message,
      amount: event.data.amount,
      address: event.data.address,
      event: event.data.event
    })
  }
  else if (event.source === window &&
    event.data.direction === "update-multi-page-script") {
      const valuesList = event.data.values;
      const messageEvent = event.data.event;
  
      const modifiedValuesList = valuesList.map(eventData => ({
        id: eventData.id,
        data: eventData.message,
        amount: eventData.amount,
        address: eventData.address,
      }));

    chrome.runtime.sendMessage({
      from: 'update-multi',
      values: modifiedValuesList,
      event: messageEvent
    })
  }
  else if (event.source === window &&
    event.data.direction === "filter-page-script") {
    chrome.runtime.sendMessage({
        from: 'filter',
        ownerPublicKey: event.data.owner !== '' ? event.data.owner : null,
        recipientPublicKey: event.data.recipient !== '' ? event.data.recipient : null
    })
  }
  else if (event.source === window &&
    event.data.direction === "account-page-script") {
    chrome.runtime.sendMessage({
        from: 'account'
    })
  }
});

const commit = document.getElementById('commit-page-script');
const get = document.getElementById('get-page-script');
const update = document.getElementById('update-page-script');
const filter = document.getElementById('filter-page-script');
const account = document.getElementById('account-page-script');

if (commit !== null) {
  commit.addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: 'showExtension' });
  });
}

if (get !== null){
  get.addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: 'showExtension' });
  });
}

if (update !== null){
  update.addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: 'showExtension' });
  });
}

if (filter !== null){
  filter.addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: 'showExtension' });
  });
}

if (account !== null){
  account.addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: 'showExtension' });
  });
}
