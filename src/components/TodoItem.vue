<template>
    <v-hover>
        <template #default="{ isHovering, props }">
            <v-row
                class="todo ma-0 align-center rounded-xl mb-1 px-3 overflow-hidden"
                style="cursor: pointer; position: relative;"
                v-bind="props"
                :class="{
                    'on-hover': isHovering,
                    'is-checked': todo.isChecked,
                    'opacity-0': isDeleting
                }"
                @click.prevent="toggleCheck"
            >
                <v-col
                    cols="1"
                    class="pa-1"
                >
                    <v-checkbox
                        v-model="todo.isChecked"
                        color="primary"
                        hide-details
                    />
                </v-col>

                <!-- 標題 -->
                <v-col class="pa-1">
                    <span class="todo-title">{{ todo.title }}</span>
                </v-col>

                <!-- 控制列 -->
                <v-col
                    cols="auto"
                    class="pa-1 ml-auto"
                >
                    <Btn
                        :icon="todo.favorite ? 'mdi-star' : 'mdi-star-outline'"
                        :btn-size="'default'"
                        :icon-size="'24'"
                        :icon-color="'primary'"
                        @click.stop.prevent="toggleFavorite"
                    />
                    <Btn
                        :icon="'mdi-chevron-left'"
                        :btn-size="'default'"
                        :icon-size="'24'"
                        :icon-color="'primary'"
                        @click.stop.prevent="toggleControl"
                    />
                </v-col>

                <!-- 控制面板 -->
                <div
                    style="position:absolute;top:0;bottom:0;right:0;"
                    class="control-panel overflow-hidden"
                    :style="{
                        'width': isControlOpen ? '70%' : '0'
                    }"
                    @click.stop
                >
                    <v-row
                        class="bg-primary rounded-xl ma-0 justify-space-between align-center px-5 fill-height"
                    >
                        <v-col
                            cols="auot"
                            class="pa-1"
                        >
                            <Btn
                                v-if="isControlOpen"
                                :icon="'mdi-delete-outline'"
                                :btn-size="'default'"
                                :icon-size="'24'"
                                :icon-color="'white'"
                                @click.stop.prevent="deleteTodo"
                            />
                        </v-col>
                        <v-col
                            cols="auot"
                            class="pa-1"
                        >
                            <Btn
                                :icon="'mdi-chevron-right'"
                                :btn-size="'default'"
                                :icon-size="'24'"
                                :icon-color="'white'"
                                @click.stop.prevent="toggleControl"
                            />
                        </v-col>
                    </v-row>
                </div>
            </v-row>
        </template>
    </v-hover>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import { Todo } from '@/types/Todo';

import Btn from './Btn.vue';

const customProps = defineProps<{
    todo: Todo,
}>();

const todo = ref(customProps.todo);
const isDeleting = ref(false);
const isControlOpen = ref(false);

const emit = defineEmits(['delete:todo']);

function toggleCheck() {
    todo.value.isChecked = !todo.value.isChecked;
}

function toggleFavorite() {
    todo.value.favorite = !todo.value.favorite;
}

function toggleControl() {
    isControlOpen.value = !isControlOpen.value;
}

function deleteTodo() {
    toggleControl();
    setTimeout(() => {
        isDeleting.value = true;
    }, 250);

    setTimeout(() => {
        emit('delete:todo');
    }, 400);
}
</script>
<style lang="scss" scoped>
.on-hover {
    background-color: rgba(var(--v-theme-primary), 0.3);
}

.todo {
    transition: all 0.2s ease;
}

.todo-title {
    color: rgb(var(--v-theme-warning));
    position: relative;
    transition: all 0.2s ease;

    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 1px;
        background-color: rgb(var(--v-theme-darkgrey));
        transition: all 0.2s ease;
    }
}

.is-checked {
    .todo-title {
        color: rgb(var(--v-theme-primary));

        &::after {
            width: 100%;
        }
    }
}

.control-panel {
    transition: all 0.2s ease;
}
</style>
