import { useCallback } from 'react';

export default function useStyleDataItem(column, dataItem) {
  const callbackRef = useCallback(
    node => {
      const formatDataItem = () => {
        const formatNumber = number => {
          return number > 1000000
            ? new Intl.NumberFormat().format((number / 1000000).toFixed(2)) +
                'M'
            : number < 1
            ? number.toFixed(6)
            : number.toLocaleString();
        };

        if (!dataItem) return ' ';

        switch (column.type) {
          case 'number':
            return formatNumber(
              // if column is current_price, dataItem will be an object
              column.name === 'current_price'
                ? dataItem.current_price
                : dataItem
            );
          case 'currency':
            return '$' + formatNumber(dataItem);
          case 'percent':
            return dataItem > 0
              ? '+' + dataItem.toFixed(2) + '%'
              : dataItem.toFixed(2) + '%';
          default: {
            return dataItem;
          }
        }
      };

      const formatColor = () => {
        let color = '#1e2026';

        if (column.type === 'percent') {
          if (dataItem > 0) {
            color = 'rgb(2, 192, 118)';
          }

          if (dataItem < 0) {
            color = 'rgb(248, 73, 96)';
          }
        }
        // if column is current_price, dataItem will be an object with current and prev price, to be used for stying logic
        if (column.name === 'current_price') {
          if (dataItem.current_price > dataItem.prev_price)
            color = 'rgb(2, 192, 118)';

          if (dataItem.current_price < dataItem.prev_price)
            color = 'rgb(248, 73, 96)';
        }

        return color;
      };

      const style = {
        container: {
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #eaecef',
          fontSize: '.88rem',
          color: formatColor(),
          ...column.style,
        },
      };

      if (node) {
        Object.keys(style.container).forEach(key => {
          node.style[key] = style.container[key];
        });
        column.type !== 'button' && (node.textContent = formatDataItem());
      }

      callbackRef.current = node;
    },
    [column, dataItem]
  );
  return [callbackRef];
}
