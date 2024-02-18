"use client"; // This is a client component 

import { Center, Text, Flex, Button, Box, CardHeader, Card, CardBody, Heading, Stack, StackDivider, Link } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { useState } from 'react'
import { imageBytes } from './bytes';

export default function Home() {
  const [data, setData] = useState(null);
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [signature, setSignature] = useState('');

  var EC = require('elliptic').ec;
  var ec = new EC('secp256k1'); // should be secp256r1 ugh 

  let req_data = {
    "transformations": [{"Crop":{"x":0,"y":0,"height":100,"width":100}}],
    "signature": signature.toString(),
    "public_key": publicKey.toString(),
    "img": imageBytes.toString()
  }

  // generate keys
  const generateKeys = () => {
    // Generate a new ECDSA key pair
    const keyPair = ec.genKeyPair();
    const privateKeyHex = keyPair.getPrivate('hex');
    const publicKeyHex = keyPair.getPublic('hex');

    setPrivateKey(privateKeyHex);
    setPublicKey(publicKeyHex);
  };

  // sign image
  const signImage = () => {
    const key = ec.keyFromPrivate(privateKey, 'hex');
    const sig = key.sign(imageBytes.toString());
    const signatureHex = sig.toDER('hex');
    setSignature(signatureHex);
  }

  return (
<>
  <Flex paddingTop={'5%'}></Flex>
    <Flex flexDirection={'column'} alignItems={'center'}>
    <Text fontSize={'60px'}  padding={'10px'} fontWeight={'bold'}>
      PROOF PIX
    </Text>
    <Flex alignItems={'center'} flexDirection={'column'}> 
  
    <Text>
      {"In today's digital world, it's hard to distinguish between real and fake content."}
    </Text>
    <Text>
    {"We need a way to certify if something came from a real camera that can't be forged."}
    </Text>

    <Text alignItems={'center'} paddingTop={'10px'} fontWeight={'bold'}>
    {"Enter the magic of zero-knowledge cryptography and blockchains. "}
    </Text>
    </Flex>
    <Flex marginTop='40px' gap={'40px'}> 
    <Box >
    <Link textDecor={'underline'} href='https://github.com/kayleegeorge/attested-images' isExternal>
      ZK Image Transformation Library
      </Link>
      </Box>
      <Box >
      <Link textDecor={'underline'} href='https://github.com/Sofianel5/ProofPix' isExternal>
      iPhone App
      </Link>
      </Box>
      </Flex>

    <Flex paddingTop = '30px' gap = '16px' >

      <Box boxSize='200px'>
        <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
        <Text paddingTop='6px'>authentic.</Text>
      </Box>

      <Box boxSize='200px'>
        <Image src='https://i.natgeofe.com/n/8a4cd21e-3906-4c9d-8838-b13ef85f4b6e/tpc18-outdoor-gallery-1002418-12000351_01_square.jpg' alt='Dan Abramov' />
        <Text paddingTop='6px'>authentic.</Text>
      </Box>

      <Box boxSize='200px'>
        <Image src='https://miro.medium.com/v2/resize:fit:1024/1*NWEB3tLSNGz2aTh9vvEl5w.png' alt='Dan Abramov' />
        <Text paddingTop='6px'>not authentic.</Text>
      </Box>
    </Flex>

    <Flex paddingTop = '50px' gap={'10px'}>
      <Button colorScheme='teal' size='md' 
      borderWidth={'1px'} borderRadius={'6px'} padding='8px' onClick={() => {
          generateKeys();
          signImage();
          console.log(signature.toString());
          fetch('http://3.231.228.92:9999', {method: 'POST', body: JSON.stringify(req_data)})
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error(error));
      }}>
        Certify Image
      </Button>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </Flex>

    </Flex>
    
    </>
  );
}
