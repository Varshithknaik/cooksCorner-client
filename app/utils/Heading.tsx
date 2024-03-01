import React from 'react'

type Props = {
  title: string;
  description: string;
  keywords: string;
}

const Heading = (props: Props) => {
  console.log('ff')
  console.log(props)
  return (
    <>
      <title>{props.title}</title>
      <meta name='viewport' content='viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'/>
      <meta name='description' content={props.description} />
      <meta name='keywords' content={props.keywords} />
      <meta name='author' content='Alejandro Sanchez' />
    </>
  )
}

export default Heading