import { renderHook } from '@testing-library/react-hooks'
import { 
  useUpdateViewerInputs,
  useGetViewer,
}
from '../../Hooks/useAPICalls';
import * as useAPI from '../../Hooks/useAPI';


describe('useAPICall Test', () => {
  it('useUpdateViewerInputs should return a status code', () => {
    const mockReturnObj = {
      loading: false,
      data: 200,
    }
    jest.spyOn(useAPI, 'default')
      .mockReturnValue({ complete: true, data: 200 });

    const { result : { current } } = renderHook(() => useUpdateViewerInputs());
    
    expect(current).toMatchObject(mockReturnObj);
  });

  it('useGetViewer should return an object with loading and viewerInfo', () => {
    const mockApiObj = {
      complete: true,
      data:[
        'input 1',
        'input 2',
        'input 3',
      ]
    }
    const mockReturnObj = {
      loading: false,
      viewerInfo: [
        'input 1',
        'input 2',
        'input 3',
      ]
    }
    jest.spyOn(useAPI, 'default')
      .mockReturnValue({...mockApiObj});

    const { result : { current } } = renderHook(() => useGetViewer('name'));

    expect(current).toMatchObject(mockReturnObj)
  })
});