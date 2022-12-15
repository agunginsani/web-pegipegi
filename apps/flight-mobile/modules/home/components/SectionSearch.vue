<script lang="ts" setup>
import SearchForm from 'home-module/components/SearchForm.vue'
import SearchFormInput from 'home-module/components/SearchFormInput.vue'
import {Button} from '@pegipegi/web-pegipegi-ui'
</script>

<template>
  <div class="p-3 pt-[200px]">
    <SearchForm>
      <SearchFormInput/>
      <SearchFormInput/>
      <SearchFormInput/>
      <Button class="w-full mt-2">Cari Tiket Pesawat</Button>
    </SearchForm>
  </div>
</template>