<template>
	<button class="h-5 bg-gray-200">
		<div v-if="!isPending">{{ text }}</div>
		<div class="flex items-center justify-center" v-else>
			<div
				class="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4"
				role="status"
			></div>
			<span class="visually-hidden">Loading...</span>
		</div>
	</button>
</template>

<script setup>
	const props = defineProps({
		isPending: {
			type: Boolean
		},
		text: {
			type: String,
			default: ''
		}
	})
</script>
