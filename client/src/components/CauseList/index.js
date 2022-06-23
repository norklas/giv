import SingleCause from '../SingleCause';
import { useState } from 'react';

const CauseList = () => {
    const [sampleCauses] = useState([
        {
            title: "Example Charity 1",
            description: "Morbi eleifend nibh eu maximus gravida. Nulla eget porta erat. Sed arcu nibh, dapibus sit amet imperdiet a, sollicitudin ac risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
            category: "Distaster Relief",
            url: "www.charity1.org"
        },
        {
            title: "Example Charity 2",
            description: "Morbi eleifend nibh eu maximus gravida. Nulla eget porta erat. Sed arcu nibh, dapibus sit amet imperdiet a, sollicitudin ac risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
            category: "Distaster Relief",
            url: "www.charity2.org"
        }
    ]);

    return (
        <div>
            {sampleCauses.map((cause) => (
                <SingleCause cause = {cause} />
            ))}
        </div>
    )
}

export default CauseList;