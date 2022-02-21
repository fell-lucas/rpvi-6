import ContentLoader from 'react-content-loader';

export const SkeletonLoader = () => {
  return (
    <ContentLoader className='w-full h-full' foregroundColor='#d6d6d6'>
      {Array.from({ length: 6 }, (_, x) => x * 400).map((y1) => {
        return [
          <rect
            key={`rect_${y1 + 1}`}
            x='0'
            y={50 + y1}
            rx='10'
            ry='10'
            width='300'
            height='40'
          />,
          ...Array.from({ length: 6 }, (_, x) => x * 660).map((x1) => {
            return Array.from({ length: 5 }, (_, x) => x * 60).map((y2) => (
              <rect
                key={`rect_${y1 + x1 + y2}`}
                x={x1}
                y={120 + y2 + y1}
                rx='10'
                ry='10'
                width='600'
                height='40'
              />
            ));
          }),
        ];
      })}
    </ContentLoader>
  );
};
