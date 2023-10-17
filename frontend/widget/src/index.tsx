import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';

let root: ReactDOM.Root | null = null;

export const handleApp = (value: boolean) => {
	const appRoot = document.getElementById('reon-yamailer-root');
	appRoot?.setAttribute('data-is-open', `${value}`);
	value ? document.body.classList.add('reon-yamailer-scroll-lock') : document.body.classList.remove('reon-yamailer-scroll-lock');
	root?.render(
		<BrowserRouter>
			<App isActive={value}/>
		</BrowserRouter>
	);
}

const openYamailerHandler = () => {
	if (root) {
		handleApp(true)
	} else {
		const rootNode = document.getElementById('reon-yamailer-root');
		if (rootNode && rootNode.getAttribute('data-is-open') === 'false' && !rootNode.querySelector('reon-yamailer-app')) {
			rootNode?.setAttribute('data-is-open', 'true');
			root = ReactDOM.createRoot(rootNode);
			handleApp(true);
		}
	}
};

const mutateHandler = () => {
	if (document.querySelector('.aside-hover-emails')) {
		const asideMailList = document.querySelector('.aside-hover-emails .aside__list');
		if (asideMailList) {
			const checkOpenButtonInstance = asideMailList.querySelector('#reon-yamailer-open');
			if (!checkOpenButtonInstance) {
				asideMailList.insertAdjacentHTML('afterbegin', `
					<li class="aside__list-item reon-yamailer-open" id="reon-yamailer-open" title="Yamailer">
						<a href="#" class="aside__list-item-link reon-yamailer-open__link">
							Письма от REON
						</a>
					</li`);
			}
			const yamailerOpenBtn = document.getElementById('reon-yamailer-open');
			if (yamailerOpenBtn) {
				yamailerOpenBtn.removeEventListener('click', openYamailerHandler);
				yamailerOpenBtn.addEventListener('click', openYamailerHandler);
			}
		}
	}
};

const Wid = {
	render () {
		const newMessageObserver = new MutationObserver(mutateHandler);
		const messagesContainer = document.querySelector('.left-menu[id="left_menu"]');
		if (messagesContainer) {
			newMessageObserver.observe(messagesContainer,
				{
					childList: true
				}
			);
		}
		return true;
	},

	init () {
		return true;
	},

	bind_actions () {
		return true;
	},

	settings () {
		return true;
	},

	advancedSettings () {
		return true;
	},

	onSave () {
		return true;
	},

	destroy () {
		handleApp(false);
		return true;
	},
};

export default Wid;