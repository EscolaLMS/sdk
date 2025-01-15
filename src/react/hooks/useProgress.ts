import { useCallback, useContext, useEffect, useState } from "react";
import { CourseProgress, DefaultResponseSuccess } from "../../types";
import { EscolaLMSContext } from "../context";

type PogressState = {
  data: CourseProgress | undefined;
  loaded: boolean;
  loading: boolean;
};

export const useProgress = () => {
  const [progress, setProgress] = useState<PogressState>({
    data: undefined,
    loaded: false,
    loading: false,
  });
  const { user, fetchProgress } = useContext(EscolaLMSContext);

  const getProgressData = useCallback(() => {
    setProgress({
      ...progress,
      loading: true,
    });
    fetchProgress()
      .then((res) => {
        const response = res as DefaultResponseSuccess<CourseProgress>;
        if (response.success) {
          setProgress({
            data: response.data,
            loaded: true,
            loading: false,
          });
        }
      })
      .catch(() =>
        setProgress({
          ...progress,
          loaded: true,
          loading: false,
        })
      );
  }, []);

  useEffect(() => {
    if (user?.value && !user.loading && !progress.loading && !progress.loaded) {
      getProgressData();
    }
  }, [user, progress, fetchProgress]);

  return {
    progress,
    getProgressData,
  };
};
