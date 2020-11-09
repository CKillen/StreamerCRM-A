import { useEffect, useRef, useState } from "react";
import { useUpdateViewerInputs } from './useAPICalls'

export default function useTextSaveDelay(save, time) {
  const timer = useRef(null);
  const mostRecentSave = useRef(null);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    if(timer.current !== null) {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        timer.current = null;
        mostRecentSave.current = save;
        setData(save);
      }, time)
    } else if(mostRecentSave.current !== save) {
      timer.current = setTimeout(() => {
        timer.current = null;
        mostRecentSave.current = save;
        setData(save);
      }, time)
    }
  })
  useUpdateViewerInputs(data);

};