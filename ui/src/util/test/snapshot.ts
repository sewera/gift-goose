import { ReactTestRendererJSON, TestRendererOptions, create } from 'react-test-renderer'

type ReactComponent = React.ReactElement<any, string | React.JSXElementConstructor<any>>

export type SnapshotRenderer = (
  element: ReactComponent,
  options?: TestRendererOptions,
) => ReactTestRendererJSON | ReactTestRendererJSON[] | null

export const snap: SnapshotRenderer = (element, options) => create(element, options).toJSON()
