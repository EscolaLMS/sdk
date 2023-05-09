import { renderHook, act } from '@testing-library/react';
import { useCart } from './../../src/react/hooks/useCart';

test('test loaded cart data in useCart hook', async () => {
  const { result } = renderHook(() => useCart())

  await act(async () => {
    result.current.getCartData();
  })

  expect(result.current.cart).toMatchObject({
    data: undefined,
    loaded: true,
    loading: false,
  });
});
