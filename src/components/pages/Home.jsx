import { Box, Flex, IconButton, Image, Input, InputGroup, InputRightElement, Spinner, Text } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import { useOpenAiPrompt } from '../../hooks/queries/useOpenAi'
import { useLocationsDetail, useSearchLocations } from '../../hooks/queries/useLocation'
import { usePropertiesDetail, useSearchProperties } from '../../hooks/queries/useProperty'
import SheetClip from 'sheetclip'
import { GrSearch } from 'react-icons/gr'

const sheetclip = new SheetClip()

function PropertyCard({ name, catalog_data }) {
  const { category, phone, address, hero_image, review_count, review_rating } = catalog_data || {}

  return (
    <Flex gap={3} shadow='rgba(0, 0, 0, 0.12) 0px 1px 4px' rounded={10} overflow='hidden' cursor='pointer'>
      <Image width={300} objectFit='cover' height={200} src={hero_image} alt={name} />
      <Flex flexDir='column' p={4} gap={2} flexGrow={1}>
        <Flex justify='space-between' alignItems='flex-start'>
          <Text fontSize={20} fontWeight={600}>
            {name}
          </Text>
          <Text
            as='span'
            flexShrink={0}
            background='#00A3C4'
            color='#FFFFFF'
            px={3}
            py={1}
            rounded='lg'
            display='flex'
            alignItems='center'
          >
            {category}
          </Text>
        </Flex>
        <Text>{address}</Text>
        <Text>{phone}</Text>
        <Flex gap={3}>
          <Text>Reviews: {review_count}</Text>
          <Text>|</Text>
          <Text>Rating: {review_rating}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

function Home() {
  const [input, setInput] = useState('')
  const debouncedValue = useDebounce(input, 1000)

  const { data: promptResponse, isFetching: isFetchingPrompt } = useOpenAiPrompt({ message: debouncedValue })
  const promptResult = useMemo(
    () => sheetclip.parse(promptResponse?.choices?.[0]?.message?.content || ''),
    [promptResponse]
  )

  const promptResultMap = useMemo(() => {
    if (promptResult?.length === 1) return {}

    const keys = promptResult?.[0]?.[0]?.split(',')
    const values = promptResult?.[1]?.[0]?.split(',')
    return keys.reduce((obj, key, index) => {
      obj[key] = values[index]
      return obj
    }, {})
  }, [promptResponse])

  const query = isFetchingPrompt
    ? ''
    : promptResult?.length === 2
    ? promptResultMap?.['Location'] || promptResultMap?.['destination'] || debouncedValue
    : debouncedValue

  const { data: searchLocationsResponse, isFetching: isFetchingSearchLocations } = useSearchLocations({ query })
  const location_ids = useMemo(() => searchLocationsResponse?.map(({ id }) => id) || [], [searchLocationsResponse])

  const { data: searchPropertiesResponse } = useSearchProperties({ query })

  const { data: locationsDetailResponse, isFetching: isFetchingLocationsDetail } = useLocationsDetail({ location_ids })

  const property_ids = useMemo(
    () => [
      ...location_ids.reduce(
        (propertyIDs, locationID) => [
          ...propertyIDs,
          ...(locationsDetailResponse?.[locationID]?.related_property_list?.map(({ id }) => id) || [])
        ],
        []
      ),
      ...(searchPropertiesResponse?.map(({ id }) => id) || [])
    ],
    [locationsDetailResponse, searchPropertiesResponse]
  )

  const { data: propertiesDetailResponse, isFetching: isFetchingPropertiesDetail } = usePropertiesDetail({
    property_ids
  })
  const properties = useMemo(() => Object.values(propertiesDetailResponse || {}), [propertiesDetailResponse])

  const fetching =
    isFetchingPrompt || isFetchingLocationsDetail || isFetchingSearchLocations || isFetchingPropertiesDetail

  return (
    <Box maxW='1100px' margin='0 auto' pt={80}>
      <InputGroup height={55}>
        <Input
          height='inherit'
          boxShadow='sm'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Search your destination'
        />
        <InputRightElement top={2} right={2}>
          <IconButton colorScheme='blue' aria-label='Search database' icon={<GrSearch />} />
        </InputRightElement>
      </InputGroup>
      <Flex justify='center' py={16} flexDirection='column' gap={5}>
        {fetching ? (
          <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' margin='0 auto' />
        ) : properties.length ? (
          properties.map((data) => <PropertyCard {...data} key={data.id} />)
        ) : (
          debouncedValue && <Text textAlign='center'> Sorry, we cannot provide your request</Text>
        )}
      </Flex>
    </Box>
  )
}

export default Home
