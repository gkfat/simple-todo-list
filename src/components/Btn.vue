<template>
    <v-btn
        flat
        vairant="text"
        class="bg-transparent"
        :size="customProps.btnSize"
        icon
    >
        <v-icon
            :icon="customProps.icon"
            :color="customProps.iconColor ?? 'white'"
            :size="customProps.iconSize"
        />
    </v-btn>
</template>
<script lang="ts" setup>
const customProps = defineProps<{
    icon: string,
    btnSize: string,
    iconSize: string;
    iconColor?: string;
}>();
</script>
