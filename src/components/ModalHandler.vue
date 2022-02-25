<template>
	<div class="root">
		<teleport to="body">
			<div class="modal" v-if="modalValue">
				<div>
					<slot> </slot>
					<button @click="updateModalValue">Close</button>
				</div>
			</div>
		</teleport>
	</div>
</template>

<script setup>
	import { inject } from 'vue'

	const { modalValue, updateModalValue } = inject('modalValue')
</script>

<style lang="scss">
	.root {
		position: relative;
	}

	.modal {
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.1);
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal > div {
		background-color: #fff;
		padding: 50px;
		border-radius: 10px;
	}
</style>
