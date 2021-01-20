import { useCallback } from 'react';

export default function useStyleDataItem(column, dataItem) {
  const callbackRef = useCallback(
    node => {
      let color = '#1e2026';

      if (column.type === 'percent') {
        if (dataItem > 0) {
          color = 'rgb(2, 192, 118)';
        }

        if (dataItem < 0) {
          color = 'rgb(248, 73, 96)';
        }
      }

      const style = {
        container: {
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent:
            column.justify === 'center' ? 'center' : 'flex-' + column.justify,
          minWidth: column.width,
          borderBottom: '1px solid #eaecef',
          fontSize: '.88rem',
          color: color,
        },
      };

      if (node) {
        Object.keys(style.container).forEach(key => {
          node.style[key] = style.container[key];
        });
      }

      callbackRef.current = node;
    },
    [column, dataItem]
  );
  return [callbackRef];
}
