import { Plugin } from 'obsidian';
const { nativeTheme } = require('electron').remote;


export default class SystemThemePlugin extends Plugin {

	async onload() {

		let callback = () => {

			if (nativeTheme.shouldUseDarkColors) {
				// console.log('Dark mode active');
				this.updateDarkStyle();
			} else {
				// console.log('Light mode active');
				this.updateLightStyle();
			}
		}

		// Obsidian should automatically unregister this event on unload
		this.registerEvent(nativeTheme.on('updated', callback));

		callback();

		console.log('obsidian-system-theme plugin loaded');

	}

	onunload() {

	}

	updateDarkStyle() {
		// @ts-ignore
		this.app.setTheme('obsidian');
		// @ts-ignore
		this.app.vault.setConfig('theme', 'obsidian');
		this.app.workspace.trigger('css-change');
	  }
	
	  updateLightStyle() {
		// @ts-ignore
		this.app.setTheme('moonstone');
		// @ts-ignore
		this.app.vault.setConfig('theme', 'moonstone');
		this.app.workspace.trigger('css-change');
	  }
}