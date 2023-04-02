import 'phaser';

class GameUtils {
	constructor(){

	}

	fallbackCopyTextToClipboard(text) {
		var textArea = document.createElement("textarea");
		textArea.value = text;
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		var response = false;

		try {
			var successful = document.execCommand('copy');
			var msg = successful ? 'successful' : 'unsuccessful';
			console.log('Fallback: Copying text command was ' + msg);
			response = successful;
		} catch (err) {
			console.error('Fallback: Oops, unable to copy', err);
			response = false;
		}

		document.body.removeChild(textArea);
		window.scrollTo(0, 0);
		return response;
	}

	clipboard(text) {
		return new Promise((resolve) => {
			navigator.clipboard.writeText(text).then(function() {
				resolve(true);
			}, function(err) {
				resolve(false);
			});
		});
	}

	async copyTextToClipboard(text) {
		if (!navigator.clipboard) {
			return this.fallbackCopyTextToClipboard(text);
		}
		return await this.clipboard(text);
	}

	urlAddress() {
		window.history.pushState("asdasdsd", "asdsad", '/CV_GustavoFlores.pdf');
	}

}

export default GameUtils