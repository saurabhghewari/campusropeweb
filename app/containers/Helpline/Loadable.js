/**
 *
 * Asynchronously loads the component for Helpline
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
