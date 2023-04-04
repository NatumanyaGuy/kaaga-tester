<script>
	// @ts-nocheck
	import { Button, Loading } from 'carbon-components-svelte';
	import FormContent from '$lib/FormContent.svelte';
	import { uid } from '$lib/JS/custom';
	import { toast } from '$lib/Toaster/toastStore';
	import { fade } from 'svelte/transition';
	import { db } from '$lib/firebaseConfig.js';
	import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
	import { onMount } from 'svelte';
	export let data;
	import Home from 'carbon-icons-svelte/lib/Home.svelte';
	let step = 1;
	let loading = false;

	function getMachineId() {
		let machineId = localStorage.getItem('MachineId');

		if (!machineId) {
			machineId = crypto.randomUUID();
			localStorage.setItem('MachineId', machineId);
		}

		return machineId;
	}
	onMount(() => {
		// console.log();
	});

	//Check for empty questions
	let empty = 0;
	async function checkEmpty() {
		empty = 0;
		for (let [key, value] of Object.entries(data.response)) {
			if (value == '' && data.test.find((x) => x.variable == key).compulsory == true) {
				// console.log('empty');
				toast('You missed this Question', data.test.find((x) => x.variable == key).label, 'error');
				empty++;
			}
		}
	}

	//Respond

	async function respond() {
		const testRef = doc(db, 'tests', data.docId);

		data.response.id = getMachineId() + '_' + uid();

		loading = true;
		await updateDoc(testRef, {
			responses: arrayUnion(data.response)
		})
			.catch((e) => {
				console.log(e);
			})
			.then(() => {
				loading = false;
				step = 3;
			});
	}

	// console.log(data);
</script>

<svelte:head>
	<title>Kaaga Tester {data.title ? ` - ${data.title}` : ''}</title>
</svelte:head>

{#if data.status == 'Not Found'}
	<div class="flex flex-col justify-center items-center h-[90vh]" in:fade>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-24 h-24 mx-auto "
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
			/>
		</svg>

		<h4 class="font-semibold">Couldn't find a test with this ID!</h4>
		<p class="font-light my-2">Please check you link or ID again</p>
		<Button href="/" kind="secondary" icon={Home}>Go Home</Button>
	</div>
{:else}
	<div in:fade class="mt-3s">
		{#if step == 1}
			<section class=" py-3 px-5 lg:px-2.5 w-full mb-12" in:fade>
				<FormContent bind:response={data.response} bind:formdata={data.welcome} />
			</section>
			<div class="right-2 bottom-2 fixed">
				<Button
					class=""
					on:click={() => {
						step = 2;
					}}>Continue</Button
				>
			</div>
		{:else if step == 2}
			<section class=" py-3 px-5 lg:px-2.5 w-full mb-12" in:fade>
				<FormContent bind:response={data.response} bind:formdata={data.test} />
			</section>
			<div class="right-2 bottom-2 fixed">
				<Button
					class=""
					on:click={async () => {
						console.log(data.response);
						// validate
						await checkEmpty();
						if (empty <= 0) {
							// step = 3;
							respond();
						}
					}}>Complete</Button
				>
			</div>
		{:else if step == 3}
			<section class=" py-3 px-5 lg:px-2.5 w-full mb-12" in:fade>
				<FormContent bind:response={data.response} bind:formdata={data.farewell} />
			</section>
			<div class="flex flex-row justify-center mt-4">
				<Button
					href="/"
					class=""
					on:click={() => {
						// step = 3
					}}>Finish</Button
				>
			</div>
		{/if}
	</div>

	{#if loading}
		<Loading />
	{/if}
{/if}
