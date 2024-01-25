import { writable } from 'svelte/store';

export const toastStore = writable({
	showToast: false,
	toastType: '',
	toastMessage: ''
});

export const showToastMessage = (type, message) => {
	const toastType = type === 'success' ? 'success' : 'error';
	let toastMessage = '';

	switch (message) {
		case 'screenshot':
			toastMessage = type === 'success' ? 'Applied successfully.' : 'Auto apply failed.';
			showToastEvent(toastType, toastMessage);
			break;
		case 'clearAllAccounts':
			toastMessage = type === 'success' ? 'Cleared all accounts.' : 'Error clearing accounts.';
			showToastEvent(toastType, toastMessage);
			break;
		case 'fetchAccounts':
			toastMessage = type === 'success' ? 'Fetched accounts.' : 'Error fetching accounts.';
			showToastEvent(toastType, toastMessage);
			break;
		case 'addAccount':
			toastMessage = type === 'success' ? 'Account saved.' : 'Error saving account.';
			showToastEvent(toastType, toastMessage);
			break;
		case 'editAccount':
			toastMessage = type === 'success' ? 'Updated account.' : 'Error updating account.';
			showToastEvent(toastType, toastMessage);
			break;
		default:
			break;
	}
};

const showToastEvent = (type, message) => {
	toastStore.set({
		showToast: true,
		toastType: type,
		toastMessage: message
	});

	setTimeout(() => {
		toastStore.set({
			showToast: false,
			toastType: '',
			toastMessage: ''
		});
	}, 5000);
};
