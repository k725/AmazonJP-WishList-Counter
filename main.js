(function(){
	var itemPrice = '[id^=itemPrice_]';
	var itemNoFound = '.itemAvailDetails';
	var itemPages = '.num-pages';
	var wishId = '';
	var totalCount = 0;
	var totalError = 0;

	function wishGet() {
		alert('それなりの確率でコケます。\n\n'+
			'(めっちゃ重要)転んでも泣かない人向け。\n'+
			'(とてもとても重要)旧バージョンなデザインだと動きません。');
		$.ajax({
			url: '//www.amazon.co.jp/registry/wishlist/' + wishId
		}).done(function(data) {
			
			$($.parseHTML(data)).find(itemPrice).each(function() {
				totalCount += Number(new String($(this).text()).replace(/,/g, '').replace(/[^0-9]/g, ''));
			});

			$($.parseHTML(data)).find(itemNoFound).each(function() {
				totalError++;
			});

			alert('ほしい物リストの総額は...\n\n合計で' + totalCount + '円でした!!(在庫なし: ' + totalError + ')');
		});
	}

	if(typeof $ !== 'function') {
		var s = document.createElement('script');
		s.src = '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js';
		s.onload = wishGet;
		document.body.appendChild(s);
	} else {
		wishGet();
	}
})();
