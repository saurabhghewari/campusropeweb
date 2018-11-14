/**
 *
 * Asynchronously loads the component for AdminTask
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
