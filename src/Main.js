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
            <p>This week, I explored how to work with HPC - like creating a custom conda environment. It is important to note that working with HPC posed a unique challenge, as it did not grant me the customary sudo access that
                 I had grown accustomed to in other computing environments. Overcoming this obstacle proved to be a stimulating exercise, requiring resourcefulness and creative problem-solving skills.
                . Then figured out how to work with slurm and have programs run on GPU.
                Also, I contacted the previous year contributor to same project - Shrey Pandit (PS: we are from the same university!) and 
                clarified a few doubts about the model. So, from next week on, my mentors ssaid they will give me access to the dataset</p>
            <h3 className="subtitle">Week-2</h3>
            <p>This week I got access to dataset and went through the dataset's general type. It conisted of videos in .mp4 format and was under the folder with the label names.
                So my plan to utilize this data after talking with my mentors was to have bash script which should automize the pipleine end-to-end and should be uploaded on github.
                And seeing the STGCN graphs medium blog post- I got a plan on how the input features be. The input features should be in a numpy array of (batch, channels, frames, joint number,person)
                Also, before this all, the openpose keyposes should be extracted and used. Thus I installed Openpose and made a custom python script to extract poses per frame of each video and output it 
                to the same folder structure as the input videos are in.
            </p>
            <h3 className="subtitle">Week-3</h3>
            <p> I completed the script but got it only working on my personal computer as I could not install Openpose on the HPC. Now I tried looking for resources and my mentors
                said in the meet that we need singularity container to use it on HPC, and he said he is gonna reach out to some other members who can 
                provide already extracted and improved dataset. Then I installed singularity and openpose using this <a href="https://medium.com/@abhinavpatel2912/setting-up-openpose-in-cwru-hpc-8955f510f6ac"> blogpost</a>,
                which was written by a previous GSoC contributor of the same organization. But I found some inconsistencies with the steps, but then eventually figured out a way to use
                openpose with singularity! Then proceeeded to extract all the features framewise
            </p>
            <h3 className="subtitle">Week-4</h3>
            <p> Using the extracted keypose points in json file format, I programmed a python script to extract the keypose point coordinates and score,
                then used them to construct a numpy array with the previously agreed format and saved them all in a .npy file per single video. Furthermore, I created a Dataset class using pytorch, 
                and loaded and tested it successfully! Upon the further discussion with my mentors, who asked me to explaing the STGCN model in detail, they agreed it can be effective way and they said a better
                dataset will be provide to me next week, which I should utilize it.
                
                A bit about STGCN:
                    Spatio Temporal Graph convolutional network or STGCN in short, expploits the graph structure of the skeloton poses to classify them.
                    STGCNs have 2 major components - the spatial convolution and the temporal one. The spatial convolution takes in the feature of K nearest neighbours(in our case 1) on the same temporal
                    frame, and passes it down to a linear layer. This spatial model also has different partion scheme where it partitions the nearest K neighbours into different classes based on a heurestic decide (which mostly invovles the distance from the center of the body),
                    and then uses the same weights for the same classes. Then across the temporal domain, a temporal kernel size is to be decided and uses the feauter of nodes along the T temporal domain but the same spatial domain.
                    Then at the end, a softmax classifier is used to predict the probaibility of the classes that the gesture belongs to. It also uses a mask layer which gives in the weightage or importance of each node before passing onto the network.
                PS: I also read some literature which stated STGCN includes only short term features and are best suitable for it and for long term features, fusion can be performed to combine STGCN and lstm network.
            </p>
            <h3 className="subtitle">Week-5</h3>
            <p> I took a look at the new improved dataset which had all the relevant keypose points in csv file and modified the json-to-npy script to make it work with csv.
                And upon further looking at this dataset, I found class imbalance like one label had 2 samples, but some had like 130! 
                Then I thought to utilize transfer learning from the original STGCN, but found they used a different openpose structure which only had 18 points compared to the 
                25 body keyposes this dataset uses, which should be resolved....
            </p>
            <h3 className="subtitle">Week-6</h3>
            <p> I utilized the STGCN model and modified it for using 25 keypose points, and then made the classses one hot vector to be used.
                Then split the training and testing dataset randomly and used a crossentropyloss, and a adam classifier. But the results, were not 
                good.... I got only a training and testing accuracy of a mere 5%. Upon the investigation on the dataset I found the dataset to be unbalanced, with some classes having 2 videos and 
                while some having more than 100 video examples! So, I tried using weights to the crossentropyloss which gives different weightage to different classes, so by this my idea was to make
                the classes with most videos to have more weightage and have more penalty in return, but I found this approach only increased the accuracy to about 8%.
                Then I resorted to use oversampling, which after 30 epochs, I got a training accuracy of about 94% and testing accuracy of about 80%!!!
                I may have dealt with the imbalance but the model seems to be overfitting and I will use techniques like SMOTE(Synthetic Minority Oversampling Technique) and 
                custom augmentation on keypose points (I could not find any good paper or example on the internet for augmentation on direct keypose points). So my idea would for the custom augmentation to use 
                inversion about the vertical axis(as the gesture performed should be hand or direction invariant), and will introudce gaussian noise to nudge the keypose points a litte from their original postion and
                will use randomly drop or 1 or 2 keypose points. Also, I did not use batching due to different frames in each video, which made the training slower. I plan to make the frames uniform by oversampling frames and
                inserting them.
            </p>
            <h3 className="subtitle">Week-7</h3>
            <p> After the meet with my mentor, I decided to implement the changes as asked. I failed to see how oversampling can be a great issue
                here!! So, I went on to create a Stratified Split technique which is in scikit learn and use it to split train and test.
                Stratified splitting technique, splits the classes with large amount of samples in the ratio specified and the smaller ones (typically about 2-10 in size)
                in a 50-50 manner for test and train. I implemented these changes. Also, I implemented a zero padding function which pads the keypose graph with 0s making the graph size equal,
                and allows for batching, leaving the model to learn the zeros are actually padding and not any significant value.
                
                But sadly, after following stratified split, I did not get the test scores I got previously and it was very low like about 2-3%. Thanks
                to my mentor for rightly pointing out, and my training score was about 80%, and clearly my model was overfitting here.

            </p>
            <h3 className="subtitle">Week-8</h3>
            <p>
                This week, I started researching some ways to reduce overfitting, I tried L2 regularisation and dropout. Also, I 
                limited the classes to the ones which are having more than 20 samples. But unfortunately, I got the same results with
                test score at ~3%. :(
                
                And I could not work mostly due to heavy rains and prolonged powercut in the region I live in. But have ideas to implement
                an embeddding layer which differentiates the STGCN in a space and classifies them.

            </p>
                <h3 className="subtitle">Week-9</h3>
            <p> This week I implemented cosine simalrity loss to create an embedddingl layer for the model. Also, decreased the complexity
                of the model by reducing the input features restricting them to face and hand body keypose points and decreasing the 
                model layer size. I tried out with different learning rates, at first 10 epochs, the model's train and test scores gradually
                rise to about 7-8% and loss slowly decreases, but after 10 epochs the training score increases rapidly with no change from
                test scores, making the model overfit again. :( 
                
                I have to still see a way to avoid overfitting and will update this week's entry till this week.
            </p>
        </div>
    )
}

