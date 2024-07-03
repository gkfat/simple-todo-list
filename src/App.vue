<template>
    <v-app>
        <v-main>
            <v-layout
                class="fill-height justify-center align-center"
            >
                <v-card
                    id="main-card"
                    elevation="14"
                    width="100%"
                    height="95%"
                    :max-width="'500px'"
                    style="border-radius: 36px;"
                >
                    <v-row
                        style="flex-direction: column;"
                        class="fill-height ma-0"
                    >
                        <v-col
                            class="rounded-b-xl bg-white py-5 px-8"
                        >
                            <!-- Header -->
                            <h1 class="text-h5 font-weight-light text-warning d-flex align-center mb-5">
                                <v-icon
                                    icon="mdi-list-box"
                                    class="me-3"
                                    color="warning"
                                    size="36"
                                />
                                Simple Todo List
                            </h1>

                            <!-- Todo list -->
                            <div class="overflow-y-auto fill-height">
                                <TodoItem
                                    v-for="(todo, i) of todoList"
                                    :key="todo.title"
                                    :todo="todo"
                                    @delete:todo="deleteTodo(i)"
                                />
                            </div>
                        </v-col>

                        <!-- Panel -->
                        <v-col class="mx-auto flex-grow-0 py-5 px-8 rounded-xl">
                            <v-row class="ma-0 justify-space-between align-center ga-5">
                                <Btn
                                    :icon="'mdi-home-outline'"
                                    :btn-size="'large'"
                                    :icon-size="'42'"
                                />
                                <Btn
                                    :icon="'mdi-star-outline'"
                                    :btn-size="'large'"
                                    :icon-size="'42'"
                                />
                                <Btn
                                    :icon="'mdi-plus-circle-outline'"
                                    :btn-size="'x-large'"
                                    :icon-size="'54'"
                                />
                                <Btn
                                    :icon="'mdi-note-outline'"
                                    :btn-size="'large'"
                                    :icon-size="'42'"
                                />
                                <Btn
                                    :icon="'mdi-cog-outline'"
                                    :btn-size="'large'"
                                    :icon-size="'42'"
                                />
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>
            </v-layout>
        </v-main>
    </v-app>
</template>

<script lang="ts" setup>
import {
    onMounted,
    ref,
} from 'vue';

import Btn from '@/components/Btn.vue';
import TodoItem from '@/components/TodoItem.vue';
import { Todo } from '@/types/Todo';

const todoList = ref<Todo[]>([]);

function deleteTodo(i: number) {
    todoList.value.splice(i, 1);
}

onMounted(() => {
    todoList.value = [
        {
            title: 'Buy chicken',
            isChecked: false,
            favorite: false,
        },
        {
            title: 'Do laundry',
            isChecked: false,
            favorite: false,
        },
        {
            title: 'Wash dishes',
            isChecked: true,
            favorite: true,
        },
    ];
});
</script>

<style lang="scss" scoped>
#main-card {
    background: linear-gradient(
        90deg,
        rgb(var(--v-theme-primary)),
        rgb(var(--v-theme-secondary)),
    );
}
</style>
