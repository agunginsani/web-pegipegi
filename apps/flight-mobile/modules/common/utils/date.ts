import * as dateFns from 'date-fns';
import { id } from 'date-fns/locale';

dateFns.setDefaultOptions({ locale: id });

export default dateFns;
