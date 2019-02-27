// import React from 'react'
// import {Grid, Image} from 'semantic-ui-react';

// const LandingGrid = () => {
//     console.log('landing-grid.js:5')
//     return (
//     <Grid divided='vertically'>
//         <Grid.Row columns={2} >
//             <Grid.Column>
//                 <Image src={imgBeef} />
//             </Grid.Column>
//             <Grid.Column>
//                 <Image src={imgBeef} />
//             </Grid.Column>
//         </Grid.Row>
//         <Grid.Row columns={2} >
//             <Grid.Column>
//                 <Image src={imgBeef} />
//             </Grid.Column>
//             <Grid.Column>
//                 <Image src={imgBeef} />
//             </Grid.Column>
//         </Grid.Row>
//     </Grid>
//     )
// }

import React from 'react'
import {Grid, Image} from 'semantic-ui-react'

const LandigGrid = () => (
  <Grid divided="vertically">
    <Grid.Row columns={2}>
      <Grid.Column>
        <Image src={imgBeef} />
      </Grid.Column>
      <Grid.Column>
        <Image src={imgPork} />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row columns={2}>
      <Grid.Column>
        <Image src={imgChicken} />
      </Grid.Column>
      <Grid.Column>
        <Image src={imgWagyu} />
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default LandigGrid

// Images:::

const imgBeef =
  'https://crowdcow-images.imgix.net/https%3A%2F%2Fimages.ctfassets.net%2Fjigso8mmhmq2%2F1RoxqJrZXCQUWQAKqiUyem%2Ff36b036ca0ed53efa285e79a9149a100%2FBeef.png?ixlib=rails-2.1.4&w=1400&auto=compress%2C%20format&fit=min&s=8dd09b9c538cbcaeda5a8ec62aed45de'
// const imgPork = 'https://crowdcow-images.imgix.net/https%3A%2F%2Fimages.ctfassets.net%2Fjigso8mmhmq2%2F4L2xGbfTirXRd9n8rY79EJ%2F9b426fcb5c0ab0825045650079324a77%2Fpork.png?ixlib=rails-2.1.4&w=1400&auto=compress%2C%20format&fit=min&s=dc3b9d3e535f548f77fa74a7cc2322ad'
const imgPork =
  'https://crowdcow-images.imgix.net/https%3A%2F%2Fimages.ctfassets.net%2Fjigso8mmhmq2%2FFjkoTP9QwEaqgOw48cScg%2F95baf1ce7756cbf4993e3199c53cb909%2FPork.png?ixlib=rails-2.1.4&w=1400&auto=compress%2C%20format&fit=min&s=7fd1406e1886a72f604581a664e6545e'
const imgChicken =
  'https://crowdcow-images.imgix.net/https%3A%2F%2Fimages.ctfassets.net%2Fjigso8mmhmq2%2F4Ie7qqZFigkygsaI28KWOo%2F9b6ef0f8d1419efcee9e274f47b1a7a4%2FChicken.png?ixlib=rails-2.1.4&w=1400&auto=compress%2C%20format&fit=min&s=a2cfd041ba836f01eb70c443657d3d73'
const imgWagyu =
  'https://crowdcow-images.imgix.net/https%3A%2F%2Fimages.ctfassets.net%2Fjigso8mmhmq2%2FBHXf5SQEHmUUWqWusAkcC%2F2c6628fb15502b70c7f8f33642bcd846%2FWagyu.png?ixlib=rails-2.1.4&w=1400&auto=compress%2C%20format&fit=min&s=69204810253638b3270cf15bf38265e3'
