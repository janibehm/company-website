import {SanityImage, type WrapperProps} from 'sanity-image'

import {dataset, projectId} from '@/sanity/lib/api'

const isVectorAsset = (id?: string) => typeof id === 'string' && /-svg$/i.test(id)

const Image = <T extends React.ElementType = 'img'>(props: WrapperProps<T>) => {
  const vectorAsset = isVectorAsset((props as {id?: string}).id)

  return (
    <SanityImage
      baseUrl={`https://cdn.sanity.io/images/${projectId}/${dataset}/`}
      {...props}
      hotspot={vectorAsset ? undefined : props.hotspot}
      crop={vectorAsset ? undefined : props.crop}
    />
  )
}

export default Image
