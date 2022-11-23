<script lang="ts" setup>
  import z from "zod";

  const PickPointSchema = z.object({
    traceId: z.string(),
    time: z.string(),
    data: z.array(
      z.object({
        address: z.string(),
        id: z.string(),
        isMapAvailable: z.boolean(),
      })
    ),
  });

  const page = ref(1);
  const authFetch = useAuthFetch();

  const { data, refresh } = await useAsyncData(() =>
    authFetch("/bus/search/v2/pickpoint", {
      params: { page: page.value, search: "jaka" },
    }).then((data) => PickPointSchema.parse(data))
  );
</script>

<template>
  <div>
    <button
      @click="
        page++;
        refresh();
      "
    >
      Next
    </button>
    <button
      @click="
        page--;
        refresh();
      "
    >
      Previous
    </button>
    <hr />
    <p v-if="data !== null">{{ data }}</p>
  </div>
</template>
