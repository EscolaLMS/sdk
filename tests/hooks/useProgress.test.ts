import { renderHook, act } from '@testing-library/react';
import { useProgress } from './../../src/react/hooks/useProgress';

test('test loaded progress data in useProgress hook', async () => {
  const { result } = renderHook(() => useProgress())

  await act(async () => {
    result.current.getProgressData();
  })

  expect(result.current.progress).toMatchObject({
    data: undefined,
    loaded: true,
    loading: false,
  });
});
