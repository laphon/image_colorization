import React from 'react'
import tw from 'twin.macro'
import { Title } from './components'
import Transfomer from './components/Transformer'
import diagram from './model-diagram.jpg'
import plot from './plot-losses.png'
import images from './pics.png'

const styles = {
  // Move long class sets out of jsx to keep it scannable
  container: ({ hasBackground }: { hasBackground: boolean }) => [
    tw`flex flex-col`,
    hasBackground && tw`bg-gradient-to-b from-electric to-ribbon`,
  ],
}

const headers = {
  // Headers
  container: () => [
    tw`text-xl font-semibold`
  ],
}

const App = () => (
  <div css={styles.container({ hasBackground: false })}>
    <Title/>
    
    <h3><span tw="text-xl mx-24">
      Color grayscale images with our Deep Image Colorizer! Try it out below!
    </span></h3>

    <Transfomer />

    <p tw="mx-24 mb-16 mt-8">
      <span css={headers.container()}>
        Overview
      </span>
      <br></br>
      <span tw="text-sm">
      Our problem was that we wanted to develop a method of taking images from the past,
      particularly landscape images, and develop a realistically colored version of that 
      image. We did this by training a convolutional neural network on the&nbsp;
      <a tw="text-blue-600" href="http://places2.csail.mit.edu/">places364</a>
      &nbsp;dataset from MIT.
      </span>
      <br></br><br></br>
      <span css={headers.container()}>
        How does it work?
      </span><br></br>
      <span tw="text-sm">
        Our colorizer is an autoencoder inspired by an&nbsp; 
        <a tw="text-blue-600" href="https://lukemelas.github.io/image-colorization.html">
          image colorizer
        </a> 
        &nbsp;by Luke Melas Kyriazi which 
        implements the encoder with the first 5 blocks of ResNet18. In our project, the encoder 
        instead implements the first 4 blocks of EfficientNet-B0 since it has been proven to achieve 
        high accuracy with fewer parameters compared to ResNet18. The encoder takes a single-channel 
        grayscale image as an input. The encoded features are then combined with the features 
        extracted by the first 4 blocks of pre-trained EfficientNet-B1 (provided by a PyTorch library). 
        The decoder composed of layers of convolution and upsampling will attempt to predict, from 
        the combined features, the A and B color channels which are then combined with the L 
        channel of the original image to generate a fully realized image in LAB colorspace. The full 
        implementation of our model can be found in our&nbsp;  
        <a tw="text-blue-600" href="https://github.com/laphon/image_colorization">
          GitHub repository
        </a>.
      </span>

      <img src={diagram} alt="Diagram" tw="mt-8 w-3/5"/>

      <br></br><br></br>
      <span css={headers.container()}>
        Methods and Dataset
      </span><br></br>
      <span tw="text-sm">
      Our autoencoder is trained on the&nbsp;
      <a tw="text-blue-600" href="https://github.com/universome/alis#lhq-dataset">
        LHQ256 dataset
      </a> 
      &nbsp;which is a collection of natural 
      landscape images resized to 256x256 pixels. We use Mean Square Error loss to evaluate 
      reconstruction error, and Adam to optimize the model. After training for 4000 
      iterations each by randomly sampling a batch of 16 images with a step size of 0.01, 
      we are able to achieve a minimum loss of 0.00106 on the testing set.
      </span>
      <br></br><br></br>
      <span css={headers.container()}>
        Plot of Training and Validation Losses
      </span><br></br>

      <img src={plot} alt="Plot" tw="mt-4 w-1/2"/>

      <br></br>
      <span css={headers.container()}>
        Qualitative Evaluation on Testing Images
      </span><br></br>

      <img src={images} alt="Images" tw="mt-4 w-3/5"/>

      <br></br>
      <span css={headers.container()}>
        Conclusion
      </span><br></br>
      <span tw="text-sm">
        We were able to apply a well known neural network architecture to our autoencoder to 
        reduce memory usage and achieve realistic colorization of landscape images. However, 
        within the scope of time and resources of this project, the optimization is only based 
        on simple regression with mean square error. As a result, the prediction tends to favor 
        grayish results. We believe that by changing to a classification problem instead, our 
        colorizer will be able to achieve more colorful results.
      </span>
      <br></br><br></br>
      <span tw="text-xl font-semibold">
        Contributors
      </span><br></br>
      <span tw="text-sm">
        Laphon Premcharoen<br></br>
        Varich Boonsanong<br></br>
        Ivy Ding
      </span>
      <br></br><br></br>
      <span tw="text-xl font-semibold">
        References
      </span><br></br>
      <span tw="text-sm">
        Mingxing, T., & Quoc V., L. (2019). EfficientNet: Rethinking Model Scaling for 
        Convolutional Neural Networks. ArXiv.&nbsp;
        <a tw="text-blue-600" href="https://doi.org/10.48550/ARXIV.1905.11946">
          https://doi.org/10.48550/ARXIV.1905.11946
        </a>
        <br></br><br></br>
        Zhang, R., Phillip, I., & Alexei A., E. (2016). Colorful Image Colorization. ArXiv.&nbsp; 
        <a tw="text-blue-600" href="https://doi.org/10.48550/ARXIV.1603.08511">
          https://doi.org/10.48550/ARXIV.1603.08511
        </a>
      </span>
    </p>
  </div>
)

export default App
