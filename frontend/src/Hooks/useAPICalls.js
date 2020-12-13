import { useEffect, useRef, useState } from "react";
import useAPI from "./useAPI";
import config from "../Config/config"

export const useUpdateViewerInputs = (viewerInfo) => {
  //build api call 
  //call api
  //parse and return info
  //return Status 
  const [apiInfo, setApiInfo] = useState({})
  const originalParams = useRef(null);
  const isFirstRun = useRef(true);
  if(viewerInfo !== undefined ) {
    if(originalParams.current === null || originalParams.current.inputs !== viewerInfo.inputs) {
      originalParams.current = viewerInfo;
    }
  }
  useEffect(() => {
    if(originalParams.current !== null && isFirstRun.current === false) {
      let { name, inputs } = originalParams.current;
      inputs = JSON.stringify({ inputs });
      setApiInfo({
          query: `${config.apiUrl}updateViewer?name=${name}`,
          params:
          {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: inputs,
        }
      })
    } else if(originalParams.current !== null) {
      isFirstRun.current = false;
    }
  }, [originalParams.current])
  const { complete, data } = useAPI(apiInfo.query, apiInfo.params);
  //TODO on error
  return { loading: !complete, data }
}

export const useGetViewer = (name) => {
  //TODO move to config file make jest test
  const { complete, data } = useAPI(`${config.apiUrl}getOrCreateViewer?name=${name}`);
  let viewerInfo = useRef(null);
  viewerInfo.current = data;
  useEffect(() => {
    viewerInfo.current = {
      ...data
    }
  }, [data])
  //TODO on error

  return { loading: !complete, viewerInfo: viewerInfo.current }
}

export const useGetHistoricals = () => {
  //const { complete, data } = useAPI(`${config.apiUrl}historical`);
  //Static values for testing uncomment above line to pull from backend
  let complete = true;
  let data = { dates: ["12092020", "12082020", "12072020"]};
  return { loading: !complete, dates: data.dates }
}

export const useGetHistoricalData = (date) => {
  //TODO Possibly format date correctly
  //const { complete, data } = useAPI(`${config.apiUrl}historical/${date}`);
  let complete = true;
  let data = { chats: {
    username: "Jim",
    chat: "laksdj",
    time: "11am",
  }}
}