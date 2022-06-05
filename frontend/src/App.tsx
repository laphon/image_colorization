import React from 'react'
import tw from 'twin.macro'
import { Title } from './components'
import Transfomer from './components/Transformer'

const styles = {
  // Move long class sets out of jsx to keep it scannable
  container: ({ hasBackground }: { hasBackground: boolean }) => [
    tw`flex flex-col items-center`,
    hasBackground && tw`bg-gradient-to-b from-electric to-ribbon`,
  ],
}

const App = () => (
  <div css={styles.container({ hasBackground: false })}>
    <Title/>
    <p tw="mx-8">
    <span tw="text-xl">
      Color grayscale images with our Deep Image Colorizer!
    </span>
      <Transfomer />
    <div tw="h-10">
    </div>
    <span tw="text-xl">
      How does it work?
    </span>
    <br></br>
    <span tw="text-sm">
    Our problem was that we wanted to develop a method of taking images from the past,
    particularly landscape images, and develop a realistically colored version of that 
    image. We did this by training a convolutional neural network on 
    the <a tw="text-blue-600" href="http://places2.csail.mit.edu/">places364</a> 
    dataset from MIT.

    The goal of this project is to color images of landscapes from a time period where 
    color photography did not exist yet. To accomplish this, we will create a machine 
    learning model that will learn to color grayscale landscape images as accurately as 
    possible with respect to that landscape’s original color scheme. The model will be 
    a convolutional neural network that will take in single-channel grayscale images as 
    inputs and output LAB images.

    Our architecture will have two models working in parallel: an autoencoder and a global 
    feature extractor using a pretrained model to aid the autoencoder. The dataset we will 
    use for training and testing is the places365 dataset from MIT. First, our encoder will 
    be trained from ground up and output features. Second, the global feature extractor will 
    help the encoder to extract prominent features from images. Then, we combine the features 
    from both models before using our decoder to predict A and B color channels, which it will 
    then combine with the original grayscale image as the L channel to create a fully realized 
    LAB image.
    </span>
    </p>
  </div>
)

export default App
