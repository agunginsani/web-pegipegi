type Holiday = Record<string, Record<string, Record<string, string>>> | null;

export default async function holidays() {
  const holiday = useState<Holiday>();

  if (!holiday.value) {
    const { data } = await useLazyFetch('/api/holiday');
    holiday.value = data.value;
  }

  return {
    holiday,
  };
}
