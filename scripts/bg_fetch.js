this.polling = false;

function fetchQuote(url, callback, self) {
	var fetcher = this;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(data) {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var data = xhr.responseText;
				var tradeInfo = new TradeInfo(data);
				callback(tradeInfo);
			} else {
				// TODO remove log msg
				console.log('response was not 200', xhr.status);
				callback(xhr);
			}
		}
	}
	
	// Note that any URL fetched here must be matched by a permission in
	// the manifest.json file!
	xhr.open('GET', url, true);
	return xhr;
}

function poll(url, callback, self) {
	if(this.polling) {
		setTimeout(function() {
			xhr = fetchQuote(url, callback, self);
			xhr.addEventListener("load", self.poll(url, callback, self), false);
			xhr.timeout = 3000;
			xhr.send();
		}, 5000);
	}
}

function onRequest(request, sender, callback) {
	var self = this;
	switch(request.action) {
	case 'fetch_feed':
		fetchQuote(request.url, callback).send();
		break;
	case 'polling':
		self.polling = request.value;
		if( request.value ) {
			poll(request.url, callback, self);
		}
		break;
	}
}

//Wire up the listener.
chrome.extension.onRequest.addListener(onRequest);		
