/**
 *
 * Asynchronously loads the component for Privateroute
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
