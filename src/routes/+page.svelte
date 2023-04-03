<!-- Start Page  -->
<script>
	// @ts-nocheck
	import { TextInput, Button, Theme, Loading } from 'carbon-components-svelte';
	import { toast } from '$lib/Toaster/toastStore';

	let id;

	let loading = false;
	let anchor;

	function submit() {
		if (id == '') {
			toast('Please enter your test ID', 'error');
		} else {
			loading = true;
			anchor.click();
		}
	}
</script>

<svelte:head>
	<title>Kaaga Tester</title>
</svelte:head>

<div class="flex h-[90vh] justify-center items-center">
	<div class="text-center w-[90vw] lg:w-[30vw] -mt-8">
		<img src="/favicon.png" class="h-28 w-auto my-3" alt="" />
		<h1 class="text-3xl my-2">Welcome</h1>
		<TextInput
			labelText="Enter your Test ID"
			bind:value={id}
			placeholder=""
			on:keyup={(e) => {
				id = id.replace(/[^A-Z0-9]+/gi, '-').toLowerCase();
				if (e.key == 'Enter') {
					submit();
				}
			}}
		/>
		<br />
		<Button
			kind="secondary"
			on:click={() => {
				submit();
			}}>Get Started</Button
		>
	</div>
</div>

<a href="/{id}" class="hidden" bind:this={anchor}>go</a>

{#if loading == true}
	<Loading />
{/if}
