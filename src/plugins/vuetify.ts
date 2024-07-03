import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import colors from 'vuetify/lib/util/colors';

export const vuetify = createVuetify({
    components: {
        ...components,
    },
    directives,
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: '#808873',
                    secondary: '#C6BAAC',
                    grey: colors.grey.lighten1,
                    darkgrey: colors.grey.darken2,
                    warning: '#975557',
                    background: '#FFFBFC',
                },
            },
            dark: {
                dark: true,
                colors: {
                    primary: '#C4CBDB',
                    secondary: '#FCECDF',
                    grey: colors.grey.lighten1,
                    darkgrey: colors.grey.darken2,
                    warning: '#975557',
                    background: '#212020',
                },
            },
        },
    },
});
