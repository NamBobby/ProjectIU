import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

export const HomeCarousel: React.FC = () => {
    return (
        <div >        
        <UncontrolledCarousel
        className ="rounded"
        items={[
            {
              altText: 'Slide 1',
              key: 1,
              
              src: 'https://picsum.photos/id/123/1200/400'
            },
            {
              altText: 'Slide 2',
              key: 2,
              src: 'https://picsum.photos/id/456/1200/400'
            },
            {
              altText: 'Slide 3',
              key: 3,
              src: 'https://picsum.photos/id/678/1200/400'
            }
            ]}
        />
        </div>
    )
}