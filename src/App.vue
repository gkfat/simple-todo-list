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
                    :max-width="'480px'"
                    style="border-radius: 36px;"
                >
                    <v-row
                        style="flex-direction: column;"
                        class="fill-height ma-0 flex-nowrap"
                    >
                        <v-col class="rounded-b-xl bg-white pa-10">
                            <!-- Header -->
                            <div class="d-flex align-center mb-8 ga-3">
                                <Logo />
                                <h1 class="text-h5 text-warning">
                                    Simple Todo List
                                </h1>
                            </div>

                            <!-- Todo list -->
                            <div
                                class="overflow-y-auto"
                                style="transition: all 0.2s ease"
                                :style="calcMaxHeight"
                            >
                                <TodoItem
                                    v-for="(todo, i) of filterdTodoList"
                                    :key="`${i}_${todo.title}`"
                                    :is-adding-todo="isAddingTodo && Number.isFinite(i) && i === 0"
                                    :todo="todo"
                                    @delete:todo="deleteTodo(i)"
                                    @finish:todo="finishTodo(i)"
                                />
                            </div>
                        </v-col>

                        <!-- Panel -->
                        <v-col class="mx-auto flex-grow-0 py-5 px-8 rounded-xl">
                            <v-row
                                class="add-panel align-center"
                                :class="{ 'add-panel-show': isShowAddPanel }"
                            >
                                <v-col
                                    class="bg-white"
                                    style="border-radius: 36px; position: relative;"
                                >
                                    <v-text-field
                                        ref="newTodoInputRef"
                                        v-model="newTodoInput"
                                        density="compact"
                                        variant="plain"
                                        placeholder="Add something..."
                                        class="bg-white pa-2"
                                        style="border-radius: 36px; padding-right: 60px;"
                                        hide-details
                                        @keyup.enter="addNewTodo"
                                    />

                                    <Btn
                                        class="new-todo-button"
                                        :icon="'mdi-send'"
                                        :btn-size="'52'"
                                        :icon-color="'white'"
                                        :icon-size="'28'"
                                        style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%) rotate(-45deg);"
                                        @click="addNewTodo"
                                    />
                                </v-col>
                            </v-row>

                            <v-row class="ma-0 justify-space-between align-center ga-5 mt-3">
                                <Btn
                                    :icon="'mdi-home-outline'"
                                    :btn-size="'40'"
                                    :icon-size="'40'"
                                    @click="showTodos('all')"
                                />
                                <Btn
                                    :icon="'mdi-star-outline'"
                                    :btn-size="'40'"
                                    :icon-size="'40'"
                                    @click="showTodos('favorite')"
                                />
                                <Btn
                                    :icon="'mdi-plus-circle-outline'"
                                    :btn-size="'48'"
                                    :icon-size="'48'"
                                    @click.prevent="toggleAddPanel"
                                />
                                <Btn
                                    :icon="'mdi-check-all'"
                                    :btn-size="'40'"
                                    :icon-size="'40'"
                                    @click="showTodos('checked')"
                                />
                                <Btn
                                    :icon="'mdi-cog-outline'"
                                    :btn-size="'40'"
                                    :icon-size="'40'"
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
    computed,
    onMounted,
    ref,
} from 'vue';

import Btn from '@/components/Btn.vue';
import Logo from '@/components/Logo.vue';
import TodoItem from '@/components/TodoItem.vue';
import { Todo } from '@/types/Todo';

const todoList = ref<Todo[]>([]);

const showingTodoType = ref<'all' | 'favorite' | 'checked'>('all');

const filterdTodoList = computed<Todo[]>(() => {
    if (showingTodoType.value === 'favorite') {
        return todoList.value.filter((todo) => todo.favorite);
    }

    if (showingTodoType.value === 'checked') {
        return todoList.value.filter((todo) => todo.isChecked);
    }

    return todoList.value;
});

const isShowAddPanel = ref(false);
const newTodoInputRef = ref<HTMLElement>();
const newTodoInput = ref('');

const isAddingTodo = ref(false);

function showTodos(type: 'all' | 'favorite' | 'checked') {
    isShowAddPanel.value = false;

    showingTodoType.value = type;
}

function addNewTodo() {
    todoList.value.unshift({
        title: newTodoInput.value.trim(),
        favorite: false,
        isChecked: false,
    });

    isAddingTodo.value = true;

    setTimeout(() => {
        isAddingTodo.value = false;
    }, 600);

    newTodoInput.value = '';
    isShowAddPanel.value = false;
}

function deleteTodo(i: number) {
    todoList.value.splice(i, 1);
}

function finishTodo(i: number) {
    const cloneTodo = JSON.parse(JSON.stringify(todoList.value[i]));

    deleteTodo(i);

    todoList.value.push(cloneTodo);
}

function toggleAddPanel() {
    isShowAddPanel.value = !isShowAddPanel.value;

    if (isShowAddPanel.value) {
        newTodoInputRef.value?.focus();
    }
}

const windowHeight = ref(window.innerHeight);

const updateHeight = () => {
    windowHeight.value = window.innerHeight;
};

const calcMaxHeight = computed(() => {
    const height = windowHeight.value * 0.7;

    return {
        'max-height': isShowAddPanel.value ? `${height - 150}px` : `${height - 50}px`,
    };
});

onMounted(() => {
    window.addEventListener('resize', updateHeight);

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

.add-panel {
    height: 0;
    opacity: 0;
    transition: all 0.2s ease;

    &-show {
        opacity: 1;
        height: 120px;
    }

    .new-todo-button {
        background: linear-gradient(
        90deg,
        rgb(var(--v-theme-primary)),
        rgb(var(--v-theme-secondary)),
    );
    }
}

:deep(.v-field__input) {
    padding-top: 0;
    font-size: 1.3rem;
}
</style>
