<script>
	// @ts-nocheck
	import '../app.css';
	import 'carbon-components-svelte/css/all.css';
	//Carbon Components
	import { Theme, Button, Header, HeaderUtilities } from 'carbon-components-svelte';
	import { AsleepFilled } from 'carbon-icons-svelte';
	import Sun from 'carbon-icons-svelte/lib/Sun.svelte';
	//URL params

	//Theme watcher
	let theme = 'white';

	//Toaster
	import Toast from '$lib/Toaster/Toast.svelte';
</script>

<Theme
	bind:theme
	persist
	persistKey="__theme-carbon"
	tokens={{
		'interactive-01': '#582ec5',
		'hover-primary': '#6e3bf7',
		'active-primary': '#9f1853'
	}}
/>

<Header company="Kaaga" platformName="Tester">
	<HeaderUtilities>
		<Button
			class=""
			iconDescription={theme == 'white' ? 'Dark' : 'Light'}
			size="small"
			kind="primary"
			on:click={() => {
				if (theme == 'white') {
					theme = 'g90';
				} else if (theme == 'g90') {
					theme = 'white';
				}
			}}
			icon={theme == 'white' ? AsleepFilled : Sun}
		/>
	</HeaderUtilities>
</Header>

<Toast />

<div class="w-full md:w-1/2 lg:w-1/2 mx-auto mt-12">
	<slot />
</div>
