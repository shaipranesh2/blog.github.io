import React from "react";

export default function Main(){
    return(
        <div className="Name">
            <h1 className="title-blogs">GSoC 2023- Red hen lab</h1>
            <h3 className="subtitle">Project details</h3>
            <p>Hello everyone, I will be spending this summer contributing to Red Hen labs under the Google Summer of Code 2023 program.
This project aims to improve on the previous year work on "Classification of body-keypoint trajectories
of gesture co-occurring with time expressions" by proposing a Graph neural networks to better exploit
the dataset’s nature and using fusion techniques to combine the keypose and audio data to tackle the
performance problems faced last year. For more details, refer this <a href="https://summerofcode.withgoogle.com/programs/2023/projects/989BTxO8">link.</a>
Stay tuned for more updates!!</p>
        <br></br>
            <h3 className="subtitle">Week-1</h3>
            <p>This week, I explored how to work with HPC - like creating a custom conda environment (Note that HPC does not gice
                sudo access, and was a little challenging to do so). Then figured out how to work with slurm and have programs run on GPU.
                Also, I contacted the previous year contributor to same project - Shrey Pandit (PS: we are from the same university!) and 
                clarified a few doubts about the model. So, from next week on, my mentors ssaid they will give me access to the dataset</p>
            <h3 className="subtitle">Week-2</h3>
            <p>This week I got access to dataset and went through the dataset's general type. It conisted of videos in .mp4 format and

            </p>

        </div>
    )
}

