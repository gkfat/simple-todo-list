<template>
    <v-app>
        <v-main>
            <v-layout
                class="fill-height justify-center align-center"
            >
                <v-card
                    id="main-card"
                    elevation="14"
                    class="rounded-xl"
                    width="100%"
                    height="95%"
                    :max-width="'500px'"
                >
                    <div
                        class="rounded-b-xl bg-white"
                        style="position: absolute; top: 0; left: 0; right: 0; height: 85%;"
                    >
                        <v-container fluid>
                            <h1 class="text-center">
                                Simple To Do List
                            </h1>
                        </v-container>
                    </div>
                </v-card>
            </v-layout>
        </v-main>
    </v-app>
</template>

<script lang="ts" setup>
//
</script>

<style lang="scss" scoped>
html, body {
    font-size: 16px;
    font-family: 'LatoWeb', sans-serif;
    font-weight: 300;
}

#main-card {
    background: linear-gradient(
        90deg,
        rgb(var(--v-theme-primary)),
        rgb(var(--v-theme-secondary)),
    );
}
</style>
