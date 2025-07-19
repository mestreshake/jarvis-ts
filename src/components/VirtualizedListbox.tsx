import * as React from 'react';
import { VariableSizeList } from 'react-window';
import type { ListChildComponentProps } from 'react-window';

interface ListboxComponentProps {
  children?: React.ReactNode;
}

const LISTBOX_PADDING = 8; // px

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: (style.top as number) + LISTBOX_PADDING,
    },
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>(
  function OuterElementType(props, ref) {
    const outerProps = React.useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
  },
);

export const ListboxComponent = React.forwardRef<
  HTMLDivElement,
  ListboxComponentProps
>(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const itemCount = itemData.length;
  const itemSize = 48;

  const getChildSize = () => itemSize;

  const getHeight = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;
    const maxItems = isMobile ? 3 : 8;
    if (itemCount > maxItems) {
      return maxItems * itemSize;
    }
    return itemData.length * itemSize;
  };

  const gridRef = React.useRef<VariableSizeList>(null);

  React.useEffect(() => {
    if (gridRef.current) {
      gridRef.current.resetAfterIndex(0, true);
    }
  }, [itemCount]);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemData={itemData}
          itemCount={itemCount}
          itemSize={getChildSize}
          overscanCount={5}
          style={{ padding: 0, margin: 0 }}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

export default ListboxComponent;
