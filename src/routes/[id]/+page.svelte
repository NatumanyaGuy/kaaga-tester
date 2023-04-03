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
	const testRef = doc(db, 'tests', data.docId);

	async function respond() {
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
</script>

<svelte:head>
	<title>Kaaga Tester - {data.title}</title>
</svelte:head>

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
