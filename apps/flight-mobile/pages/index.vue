<script lang="ts" setup>
  import z from "zod";
  import { Button } from "@pegipegi/web-pegipegi-ui";

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
    <Button
      @click="
        page++;
        refresh();
      "
    >
      Next
    </Button>
    <Button
      @click="
        page--;
        refresh();
      "
    >
      Previous
    </Button>
    <hr />
    <p v-if="data !== null">{{ data }}</p>
  </div>
</template>
