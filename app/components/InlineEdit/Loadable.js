/**
 *
 * Asynchronously loads the component for InlineEdit
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
