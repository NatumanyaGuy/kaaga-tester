import { writable } from 'svelte/store';

type Notification = { message: string; type: string };

export const notifications = writable<Notification[]>([]);

export function toast(message: string, subtitle: string, type: string) {
	notifications.update((state) => [{ message: message, subtitle: subtitle, type: type }, ...state]);
	setTimeout(removeToast, 3000);
}

function removeToast() {
	notifications.update((state) => {
		return [...state.slice(0, state.length - 1)];
	});
}
