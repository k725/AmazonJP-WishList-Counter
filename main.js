(() => {
	const s = document.createElement('script');
	s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js';
	s.onload = () => {
		let totalCount  = 0,
			totalError  = 0,
			totalItem   = 0;
		if (document.URL.match(/..registry\/wishlist/)) {
			alert('それなりの確率でコケます。urlを綺麗にしてから試してください。\ne.g. https://www.amazon.co.jp/registry/wishlist/2LQTBGUA6H6RT');

			$.ajax({
				url: `${document.URL}?page=0`
			}).done((data) => {
				try {
					$($.parseHTML(data)).find('span.a-price-whole').each(function () {
						totalCount += Number(new String($(this).text()).replace(/,/g, '').replace(/[^0-9]/g, ''));
						totalItem++;
					});

					$($.parseHTML(data)).find('.itemAvailMessage').filter('.a-text-bold').each(() => {
						totalError++;
						totalItem++;
					});

					alert(`ほしい物リストの総額は...\n\n合計で${totalCount}円でした!! ([未加算]在庫なし: ${totalError} / 在庫あり: ${totalItem})`);
				} catch(e) {
					alert('エラーが発生しました。リロードし、再度お試しください。');
				}
			});
		} else {
			alert('Amazonのほしい物リストからお試しください');
		}
	};
	document.body.appendChild(s);
})();
