<template>
	<label>{{ label }}</label>
	<textarea
		v-bind="$attrs"
		:placeholder="label"
		:value="modelValue"
		@input="$emit('update:modelValue', $event.target.value)"
		:rows="rows"
	/>
</template>

<script setup>
	const props = defineProps({
		label: {
			type: String,
			default: ''
		},
		modelValue: {
			type: [String, Number],
			default: ''
		},
		rows: {
			type: [Number, String],
			default: 5
		}
	})
</script>
