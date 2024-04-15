import { SidebarRightPreviewCardItem } from '../../../.nuxt/components';
<template>
    <div class="flex flex-col">
        <!-- Preview Card : What's happening -->
        <SidebarRightPreviewCard title="What's happening">
            <SidebarRightPreviewCardItem v-for="item in whatsHappeningItems">
                <div>
                    <h2 class="font-bold text-gray-800 text-md dark:text-white">
                        {{ item.title }}
                    </h2>
                    <p class="text-xs text-gray-400">{{ item.count }}</p>
                </div>
            </SidebarRightPreviewCardItem>
        </SidebarRightPreviewCard>

        <!-- Preview Card : Who to follow -->
        <SidebarRightPreviewCard title="Who to follow">
            <SidebarRightPreviewCardItem v-for="follow in whotoTofollowItems">
                <div class="flex flex-row items-center justify-between p-2">
                    <div class="flex flex-row">
                        <img
                            class="w-10-h-10 rounded-full"
                            :src="follow.image"
                            :alt="follow.name"
                        />
                        <div class="flex flex-col ml-2">
                            <h1
                                class="text=sm font-bold text-gray-900 dark:text-white"
                            >
                                {{ follow.name }}
                            </h1>
                            <p class="text-xs text-gray-400">
                                {{ follow.handle }}
                            </p>
                        </div>
                    </div>
                    <div class="flex h-full">
                        <button
                            class="px-4 py-2 font-bold text-cs text-white dark:text-black bg-black dark:bg-white rounded-full"
                        >
                            Follow
                        </button>
                    </div>
                </div>
            </SidebarRightPreviewCardItem>
        </SidebarRightPreviewCard>
    </div>
</template>

<script setup>
const whatsHappeningItems = ref([
    {
        title: "Era's Tour",
        count: "118k Tweets",
    },
    {
        title: "#CodingIsFun",
        count: "100k Tweets",
    },
    {
        title: "#TaylorSwift",
        count: "88.1k Tweets",
    },
]);

const whotoTofollowItems = ref([
    {
        name: "Eva Mae",
        handle: "@evuhmae",
        image: "https://picsum.photos/50/50",
    },
    {
        name: "Wiji",
        handle: "@wiji",
        image: "https://picsum.photos/50/50",
    },
    {
        name: "Berto Mimi",
        handle: "@bertomimi",
        image: "https://picsum.photos/50/50",
    },
]);
</script>
