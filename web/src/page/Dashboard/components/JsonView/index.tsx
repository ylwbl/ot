import React from 'react';
import ReactJson from 'react-json-view';
import { clone } from 'ramda'
interface Props {
  config: any;
}
function JsonView({ config }: Props) {
  return (
    <div>
      <ReactJson src={config} />
    </div>
  );
}

export default JsonView;
