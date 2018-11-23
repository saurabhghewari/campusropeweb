/**
 *
 * Asynchronously loads the component for DynamicList
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
