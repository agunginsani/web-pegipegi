import useSearchForm from 'home-module/composables/use-search-form';

export default defineNuxtPlugin(() => {
  const { initiateSeatClass } = useSearchForm();
  initiateSeatClass();
});
