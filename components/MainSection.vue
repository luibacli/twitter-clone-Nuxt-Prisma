<template>
    <div class="border-x" :class="twitterBorderColor">
        <div
            class="sticky top-0 px-4 py-3 bg-white/80 back-blur-md dark:bg-dim-900"
        >
            <h2 class="text-xl font-bold text-gray-800 drak:text-gray-100">
                {{ props.title }}
            </h2>
        </div>
        <div
            v-if="loading"
            class="flex items-center justify-center p-4 border-b"
            :class="twitterBorderColor"
        >
            <UISpinner />
        </div>
        <div v-else>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
const { twitterBorderColor } = useTailwindConfig();
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    loading: {
        type: Boolean,
        required: true,
    },
});
</script>
