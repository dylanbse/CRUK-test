"use client";

import { Text, Box, Heading } from "@cruk/cruk-react-components";
import { DataType, NasaResponse, NasaSearchParams } from "../types";
import { urlNasaSearch } from "../services/nasa";
import { useQuery } from "@tanstack/react-query";

export function List({
  searchValues,
}: {
  searchValues: NasaSearchParams
}) {
  const values: NasaSearchParams = {
    keywords: searchValues.keywords,
    mediaType: searchValues.mediaType,
    yearStart: searchValues.yearStart,
  };

  const urlNasaSearchUrl = values
    ? urlNasaSearch(values as NasaSearchParams)
    : "";

  console.log(urlNasaSearchUrl);

  const { data } = useQuery<NasaResponse>(
    ["nasaSearch", values],
    () => fetch(urlNasaSearchUrl).then((res) => res.json()),
    { enabled: !!urlNasaSearchUrl.length },
  );

  const listItems = !!data && data?.collection.items.map(
    (item, index) => {

      console.log(JSON.stringify(item.href))
      if(index < 10) {
        if(item.data[0] !== undefined) {
          if(item.links !== undefined) {
            return (<>
              <ListItem key={index} data={item.data[0]}>
                    <img
                      src={item.links[0]?.href}
                    />
                </ListItem>
            </>)
          }
          else {
            return (
              <ListItem key={index} data={item.data[0]}>
                <audio controls>
                  <source src={item.href[0]} type="audio/mpeg" />
              </audio>
            </ListItem>
            
          )    
          }
      }
    }
  })

  return listItems
}

export function ListItem ({
  data: {
    date_created,
    center,
    title,
    location,
  },
  children
}: {
  data: DataType,
  children: React.ReactNode
}) {

  return(
    <Box marginBottom="s">
          <Heading h4 >
            {title}
          </Heading>
          <Text>
            {location}
          </Text>
          <Text>
            {center}
          </Text>
          <Text>
            {date_created}
          </Text>
          {children}
    </Box>
)
}
