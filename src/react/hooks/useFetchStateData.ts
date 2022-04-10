export const useFetch = <FetchedData>(url: string): ReturnedData<FetchedData> => {
  React.useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const { data } = await axios.get(`${base}${url}`);

        setFetchedData({ data, loading: false, error: undefined });
      } catch {
        setFetchedData({
          data: undefined,
          loading: false,
          error: "Sth went wrong.",
        });
      }
    };

    fetchData();
  }, []);

  return fetchedData;
};
