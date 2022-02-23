<template>
	<Navbar />
	<main class="container mx-auto py-5">
		<router-view />
	</main>
</template>

<script setup>
	import Navbar from './components/Navbar.vue'
</script>
