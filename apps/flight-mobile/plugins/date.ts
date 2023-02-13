import { setDefaultOptions } from 'date-fns';
import id from 'date-fns/locale/id/index.js';

export default defineNuxtPlugin(() => {
  setDefaultOptions({
    locale: id,
  });
});
