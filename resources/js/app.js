import './bootstrap';
import '../css/app.css';
import "vue-toastification/dist/index.css"

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import {ZiggyVue} from "ziggy-js"
import Toast from "vue-toastification"
import {notifications} from "@/plugins/notifications.js";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const tostificationOptions = {
    position: 'top-right',
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: true,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(notifications)
            .use(Toast, tostificationOptions)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
