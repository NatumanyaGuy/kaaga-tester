<script>
	// @ts-nocheck
	import SortableList from 'svelte-sortable-list';

	import {
		Button,
		MultiSelect,
		Tile,
		TileGroup,
		RadioTile,
		Select,
		SelectItem,
		TextArea,
		TextInput,
		SelectableTile,
		Modal,
		NumberInput,
		Tag,
		Slider
	} from 'carbon-components-svelte';
	export let formdata = [];
	export let response;
	let open = false;
	let imageSrc;
	// console.log(formdata);
</script>

{#each formdata as item, i}
	<!-- svelte-ignore a11y-click-events-have-key-events -->

	<div
		on:click={() => {
			// console.log(item?.id);
		}}
		class="
		   "
	>
		<!-- {#if (active.id == item.id) == true}
			<div class="left-3 top-0 fixed z-50">ACTIVE</div>
		{/if} -->

		{#if item.name == 'Text Block'}
			<!-- Paragraph  -->
			<p class="pad-right ">
				{@html item.text?.html}
			</p>
			<!-- Line Break  -->
		{:else if item.name == 'Line Break'}
			<p class="" />
			<!-- Horizontal Line  -->
		{:else if item.name == 'Horizontal Line'}
			<hr class=" " />
			<!-- Dropdown Select  -->
		{:else if item.name == 'Dropdown Select'}
			<div class="mt-3">
				<p class="pad-right font-semibold">
					{item.label}
					{@html item.compulsory == true ? `<span class="text-red-400 text-xs"> * </span>` : ''}
				</p>
				<Select
					labelText=""
					on:change={(e) => {
						// console.log('value', e.target.value);
						response[item.variable] = e.target.value;
					}}
				>
					<SelectItem value="Please Select" disabled light />

					{#each item.options as option}
						<SelectItem value={option.text} light />
					{/each}
				</Select>
				<p class="pad-right font-light text-sm text-end">{item.HelperText}</p>
			</div>

			<!-- Single Select  -->
		{:else if item.name == 'Single Select'}
			<div class="mt-3">
				<p class="pad-right font-semibold">
					{item.label}
					{@html item.compulsory == true ? `<span class="text-red-400 text-xs"> * </span>` : ''}
				</p>
				<TileGroup legend="" light on:select={({ detail }) => (response[item.variable] = detail)}>
					{#each item.options as option}
						<RadioTile value={option.text}>{option.text}</RadioTile>
					{/each}
				</TileGroup>
				<p class="pad-right font-light text-sm">{item.HelperText}</p>
			</div>
			<!-- Multiple Select  -->
		{:else if item.name == 'Multiple Select'}
			<div class="mt-3">
				<p class="pad-right font-semibold">
					{item.label}
					{@html item.compulsory == true ? `<span class="text-red-400 text-xs"> * </span>` : ''}
				</p>

				<MultiSelect
					titleText=""
					label="{item.label}..."
					items={item.options}
					on:select={(event) => {
						response[item.variable] = event.detail.selected.map((x) => {
							return x.text;
						});
					}}
				/>

				<p class="pad-right font-light text-sm">{item.HelperText}</p>
			</div>
			<!-- Text Input  -->
		{:else if item.name == 'Text Input'}
			<div class="mt-3">
				<p class="pad-right font-semibold">
					{item.label}
					{@html item.compulsory == true ? `<span class="text-red-400 text-xs"> * </span>` : ''}
				</p>
				<TextInput
					bind:value={response[item.variable]}
					labelText=""
					placeholder={item.placeholder}
					helperText={item.HelperText}
					light
				/>
				<br />
			</div>
			<!-- Number Input  -->
		{:else if item.name == 'Number Input'}
			<div class="mt-3">
				<p class="pad-right font-semibold">
					{item.label}
					{@html item.compulsory == true ? `<span class="text-red-400 text-xs"> * </span>` : ''}
				</p>
				<NumberInput
					bind:value={response[item.variable]}
					label=""
					placeholder={item.placeholder}
					helperText={item.HelperText}
					light
				/>
				<br />
			</div>
			<!-- Textarea Input  -->
		{:else if item.name == 'Textarea Input'}
			<div class="mt-3">
				<p class="pad-right font-semibold">
					{item.label}
					{@html item.compulsory == true ? `<span class="text-red-400 text-xs"> * </span>` : ''}
				</p>
				<TextArea
					bind:value={response[item.variable]}
					labelText=""
					placeholder={item.placeholder}
					helperText={item.HelperText}
					light
				/>
				<br />
			</div>
			<!-- Ranking Input  -->
		{:else if item.name == 'Ranking'}
			<div class="mt-3">
				<p class="pad-right font-semibold">
					{item.label}
					{@html item.compulsory == true ? `<span class="text-red-400 text-xs"> * </span>` : ''}
				</p>
				<SortableList
					list={item.options}
					key="id"
					on:sort={(ev) => {
						item.options = ev.detail;
						response[item.variable] = ev.detail.map((x) => {
							return x.text;
						});
					}}
					let:item
					let:index
				>
					<Tile class="bx--tile bx--tile--selectable">
						<h5 class="text-center">{item.text}</h5>
					</Tile>
				</SortableList>
			</div>

			<!-- Range - Slider  -->
		{:else if item.name == 'Range Select'}
			<div class="mt-3">
				<p class="pad-right font-semibold">
					{item.label}
					{@html item.compulsory == true ? `<span class="text-red-400 text-xs"> * </span>` : ''}
				</p>

				<Slider
					fullWidth
					labelText=""
					min={item.min}
					max={item.max}
					on:change={(event) => {
						// console.log(event.detail);
						response[item.variable] = event.detail;
					}}
				/>
				<small class="pad-right font-light" style="font-size:11px;">{item.HelperText}</small>
				<br />
			</div>
		{:else if item.name == 'Image'}
			<div class="flex flex-row justify-center">
				<img
					on:dblclick={() => {
						imageSrc = item.dataURL;
						// alert('dbl click');
						open = true;
					}}
					src={item.dataURL}
					class="mx-auto max-h-[7rem] h-auto w-fit object-contain"
					alt="Photo_Image"
				/>
			</div>
		{/if}
	</div>
{/each}

<!-- Image Preview  -->
<Modal passiveModal bind:open modalHeading="View Image" on:open on:close size="lg">
	<div class="flex flex-row justify-center">
		<img
			src={imageSrc}
			class="mx-auto max-w-[35vw] w-[30vw] h-auto object-contain"
			alt="Photo_Image"
		/>
	</div>
</Modal>
