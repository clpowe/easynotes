<template>
	<Navbar />
	<main class="container mx-auto py-5">
		<router-view />
	</main>
</template>

<script setup>
	import { provide, ref } from 'vue'
	import Navbar from './components/Navbar.vue'

	const currentNotebook = ref(null)
	function updateCurrentNotebook(id) {
		currentNotebook.value = id
	}
	provide('currentNotebook', { currentNotebook, updateCurrentNotebook })
</script>
