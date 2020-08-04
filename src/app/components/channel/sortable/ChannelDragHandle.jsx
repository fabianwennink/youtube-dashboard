import {SortableHandle} from 'react-sortable-hoc';
import * as React from 'react';

const DragHandle = SortableHandle(() => <span className={'drag-button button'}>Move</span>);

export default DragHandle;
