import useSearchForm from 'home-module/composables/use-search-form';

export default defineNuxtPlugin(async () => {
  const { initiateSeatClass } = useSearchForm();
  await initiateSeatClass();
});
