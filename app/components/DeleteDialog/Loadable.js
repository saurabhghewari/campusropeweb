/**
 *
 * Asynchronously loads the component for Delete Confirmation Dialog
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
