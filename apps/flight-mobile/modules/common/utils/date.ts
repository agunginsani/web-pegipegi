import * as dateFns from 'date-fns';
// TODO: fix type definition
import { id } from 'date-fns/locale/index.js';

dateFns.setDefaultOptions({ locale: id });

export default dateFns;
