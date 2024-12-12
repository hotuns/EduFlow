import Store from 'electron-store';

const store = new Store();

store.set('unicorn', '🦄');
console.log(store.get('unicorn'));
