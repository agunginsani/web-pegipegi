import useFirebase from 'common-module/composables/use-firebase';
import { Ref } from 'vue';

type TriggerType =
  | 'Cancel Search'
  | 'Click Autocomplete Result'
  | 'Delete All Keyword';

type ParamsToBeSent = {
  screen_name: 'FlightHomeAutoComplete';
  trigger_type: TriggerType;
  item_num?: number;
  error_type?: string;
};

export default function useLocationTracker({
  keyword,
  resultCount,
}: {
  keyword: Ref<string>;
  resultCount: Ref<number>;
}) {
  const firebase = useFirebase();

  let keywordCode = '';
  let tempKeyword = '';
  let tempResultCount = 0;

  function onKeyDown(event: Event) {
    if (event instanceof KeyboardEvent) {
      keywordCode = event.code;
    }
  }

  function track(triggerType: TriggerType) {
    const paramsToBeSent: ParamsToBeSent = {
      screen_name: 'FlightHomeAutoComplete',
      trigger_type: triggerType,
      error_type: keyword.value,
      item_num: resultCount.value,
    };

    switch (triggerType) {
      case 'Cancel Search':
        if (keyword.value === '') {
          delete paramsToBeSent.error_type;
          delete paramsToBeSent.item_num;
        }
        (keyword.value || keywordCode) &&
          firebase.track('trigger_log', paramsToBeSent);
        break;

      case 'Click Autocomplete Result':
        keyword.value && firebase.track('trigger_log', paramsToBeSent);
        break;

      case 'Delete All Keyword':
        paramsToBeSent.error_type = tempKeyword;
        paramsToBeSent.item_num = tempResultCount;
        firebase.track('trigger_log', paramsToBeSent);
        break;

      default:
        throw new Error('Invalid `triggerType`!');
    }

    tempKeyword = '';
    tempResultCount = 0;
  }

  watch(keyword, (value) => {
    if (keywordCode !== 'Backspace') {
      tempKeyword = value;
    }

    if (value === '') {
      track('Delete All Keyword');
    }
  });

  watch(resultCount, (value) => {
    if (keywordCode !== 'Backspace') {
      tempResultCount = value;
    }
  });

  return { onKeyDown, track };
}
