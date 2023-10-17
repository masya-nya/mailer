define(['./index.js'], function (App) {

	const Widget = function () {

		const self = this;
		self.system = this.system();
		self.langs = this.langs;

		/** @private */
		this.callbacks = {
			render() {
				console.log('render');
				const root = document.getElementById('reon-yamailer-root');
				if (!root) {
					document.body.insertAdjacentHTML('beforeend', `<div id="reon-yamailer-root" data-is-open="false"><div/>`);
				}
				App.default.render();
				return true;
			},
			init() {
				console.log('init');
				const { path, version } = self.get_settings();
				if (!document.querySelector(`[href="${path}/style.css?v=${version}"]`)) {
					const linkTag = `<link href="${path}/style.css?v=${version}" type="text/css" rel="stylesheet">`;
					document.querySelector('head').insertAdjacentHTML('beforeend', linkTag);
				}
				App.default.init()
				return true;
			},
			bind_actions() {
				return true;
			},
			settings() {
				return true;
			},
			advancedSettings() {
				App.default.advancedSettings();
			},
			onSave() {
				return true;
			},
			destroy() {
				console.log('destroy');
				App.default.destroy();
				return true;
			},
		};

		return this;

	};

	return Widget;

});