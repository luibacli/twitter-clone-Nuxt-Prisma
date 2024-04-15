<template>
    <div
        class="m-2 border overflow-hidden bg-gray-50 rounded-2xl dark:bg-dim-700"
        :class="twitterBorderColor"
    >
        <h1
            class="p-3 text-xl font-extrabold text-gray-900 border-b dark:text-white"
            :class="twitterBorderColor"
        >
            {{ props.title }}
        </h1>

        <slot></slot>
        <div
            class="p-3 text-sm text-blue-400 cursor-pointer hover:bg-gray-100 dark:bg-dim-300"
            :class="defaultTransition"
        >
            Show more
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
});
const { twitterBorderColor, defaultTransition } = useTailwindConfig();
</script>
