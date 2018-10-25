/**
 *
 * Asynchronously loads the component for StateSearch
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
