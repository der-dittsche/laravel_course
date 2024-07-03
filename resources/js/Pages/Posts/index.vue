<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import {Head, router, useForm, Link, usePage} from '@inertiajs/vue3';
import {useToast} from "vue-toastification";
import {watch} from "vue";

const props = defineProps({
    posts: {
        type: Object,
    },
    now: {
        type: String,
    },
    can: {
        type: Object,
    }
})

const toast = useToast();
const page = usePage()

watch(
    () => page.props.message,
    (message) => {
        if (message) {
            toast(message.body, {
                type: message.type,
            });
        }
    }
)

const form = useForm('StorePost', {
    body: "",
})

const createPost = () => {
    form.post('/posts', {
        onSuccess: () => {
            form.reset()
        },
    })
}

const refreshPosts = () => {
    router.get('/posts', {}, {
        only: ['posts', 'now'],
        preserveScroll: true,
        preserveState: true,
    })
}
</script>

<template>
    <Head title="Comments">
        <meta name="description" content="Comments index"/>
    </Head>

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Comments</h2>
        </template>

        <div class="py-12">
            <div class="max-w-3xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">Comments index (last update at: {{ now }})</div>
                    <div class="py-12">
                        <div class="max-w-3xl mx-auto sm:px-6 lg:px-8 space-y-3">
                            <form
                                v-if="props.can.post_create"
                                @submit.prevent="createPost"
                                class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6"
                            >
                                <label for="body" class="sr-only">Body</label>
                                <textarea @focus="form.clearErrors('body')" v-model="form.body" name="body" id="body"
                                          rows="5" cols="30"
                                          class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full"></textarea>
                                <p v-if="form.errors.body" class="text-sm text-red-500">{{ form.errors.body }}</p>
                                <button type="submit"
                                        :disabled="form.processing"
                                        class="mt-2 bg-gray-700 px-4 py-2 rounded-md font-medium text-white"
                                        :class="{'bg-gray-400' : form.processing}"
                                >
                                    Post
                                </button>
                            </form>
                        </div>
                    </div>
                    <div class="flex py-3 justify-center">
                        <button
                            @click="refreshPosts"
                            class="text-sm text-indigo-700 hidden"
                            type="button"
                        >
                            Refresh Posts
                        </button>
                        <Link
                            preserve-scroll
                            preserve-state
                            :only="['post', 'now']"
                            :href="route('posts.index')"
                            class="text-sm text-indigo-500">
                            Refresh Page
                        </Link>
                    </div>
                    <div v-for="(post, index) in props.posts.data" :key="index"
                         class="bg-blue-100 overflow-hidden shadow-sm sm:rounded-lg m-2">
                        <div class="px-6 py-2 text-gray-900">
                            {{ post.id }} - {{ post.body }}
                        </div>
                        <div class="px-6 pb-2 text-xs">created by: {{ post.user.name }} at {{ post.created_at }}</div>
                    </div>


                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
