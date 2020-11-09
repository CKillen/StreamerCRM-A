import { useEffect, useState } from "react"
import Cookies from 'universal-cookie'

const cookies = new Cookies();

function useApi(apiCall, options) {
  const [complete, setComplete] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if(!apiCall) return;
    const fetchData = async () => {
      try {
        if(options === undefined) {
          options = {
            method: "get",
            headers: {
              Authorization: `apikey ${cookies.get("apikey")}`
            }
          }
        }
        else {
          if(options.headers){
            options.headers = {
              ...options.headers,
              Authorization: `apikey ${cookies.get("apikey")}`
            }
          } else {
            options.headers = {
              Authorization: `apikey ${cookies.get("apikey")}`
            }
          }
        }
        const response = await fetch(apiCall, options)
        const data = await response.json();
        setData(data);
        setComplete(true);
      } catch(e) {
        console.log(e)
      }
    }
    fetchData();
  }, [apiCall, options])
  return { complete, data };
}

export default useApi;