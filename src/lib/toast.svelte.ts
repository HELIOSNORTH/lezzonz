export interface Toast {
	id: number;
	message: string;
	icon: string;
}

let nextId = 1;

export const toasts = $state<Toast[]>([]);

export function showToast(message: string, icon = '✓') {
	const id = nextId++;
	toasts.push({ id, message, icon });
	setTimeout(() => {
		const index = toasts.findIndex((toast) => toast.id === id);
		if (index >= 0) toasts.splice(index, 1);
	}, 3200);
}
