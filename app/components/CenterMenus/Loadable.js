/**
 *
 * Asynchronously loads the component for CenterMenus
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
