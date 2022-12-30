import * as dateFns from 'date-fns';
import { id } from 'date-fns/locale/index.js';

// TODO: only import used stuff, or find a way to treeshake this library

dateFns.setDefaultOptions({ locale: id });

export default dateFns;
