function fetchFeed() {
	chrome.extension.sendRequest(
		{
			'action' : 'fetch_feed', 
			'url' : 'http://web.roblox.com/My/Money.aspx#/#TradeCurrency_tab'
		}, 
		function(response) {
			displayStories(response);
		}
	);
}

function displayStories(trade_data) {
	$('#popup').html("Robux: " + trade_data.total_bux + ", Tix: " + trade_data.total_tix);
}

function poll() {
	chrome.extension.sendRequest(
		{
			'action' : 'start_polling',
			'url' : 'http://web.roblox.com/My/Money.aspx#/#TradeCurrency_tab'
		}, function(response) {}
	);
}

$(document).ready(function() {
	fetchFeed();
	$('#poll').click(function(){
		chrome.extension.sendRequest(
			{
				'action' : 'polling',
				'url' : 'http://web.roblox.com/My/Money.aspx#/#TradeCurrency_tab',
				'value' : $(this).is(":checked")
			}
		);
	});
});
